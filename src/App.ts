import "reflect-metadata";

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser  from 'body-parser';
import * as path from 'path';
import * as bearerToken from 'express-bearer-token';
import * as events from "events";
import * as mongoose from 'mongoose';

import { Writer, Reader } from 'nsqjs';
import { IRoutedController, Route } from "./infrastructure/controller";
import { ResultSet, ApiError } from "./infrastructure/result";
import { IException } from "./infrastructure/exceptions";
import { IListener } from "./listeners/interface";
import { format } from 'util';

import container from "./inversify.config";
import TYPES from "./types";
import Config from './config';

export class App {
    public express: express.Application;
    public eventEmitter: events.EventEmitter;
    public writer: Writer;
    public reader: Reader;

    /**
     * @param {string} host
     * @param {string} port
     * @param {string} version
     */
    constructor(host: string, port: number, version: string) {
        this.express = express();
        this.express.listen(port, host);

        console.log(format('Listening on %s:%d... ', host, port));

        this.express.on('uncaughtException', (err) => {
            console.log('process.on handler');
            console.log(err);
        });

        this.express.use(bearerToken({
            bodyKey: 'access_token',
            queryKey: 'access_token',
            headerKey: 'Bearer',
            reqKey: 'token'
        }));

        this.initContainer();

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));

        this.express.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

            if ('OPTIONS' === req.method) {
                res.send(200);
            } else {
                next();
            }
        });

        this.initWriter();
        this.initReader();
        this.initMongo();

        this.initListeners();

        this.mountRoutes(version);

        this.express.use(this.handleException());

    }

    private initWriter(): void {
        this.writer = new Writer(process.env.NSQ_HOST, process.env.NSQ_PORT);
        //this.writer.connect();
    }

    private initReader(): void {
        /*this.reader = new Reader(process.env.NSQ_TOPIC, process.env.NSQ_CHANNEL, {
            lookupdHTTPAddresses: process.env.NSQ_LOOKUP
        });*/
        //this.reader.connect();
    }

    private initMongo(): void {
        let uri = process.env.MONGODB_DSN;

        mongoose.connect(uri, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connected to MongoDb');
            }
        });
    }

    private initContainer() {
        container.bind<events.EventEmitter>(TYPES.EventEmitter).toConstantValue(this.eventEmitter);
        container.bind<Writer>(TYPES.Writer).toConstantValue(this.writer);
        container.bind<Reader>(TYPES.Reader).toConstantValue(this.reader);
    }

    private initListeners() {
        const eventEmitter = this.eventEmitter;
        let listeners;

        try {
            listeners = container.getAll<IListener>(TYPES.Listener);
        } catch (e) {
            listeners = [];
        }

        listeners.forEach((listener: IListener) => {
            eventEmitter.addListener(listener.getEvent(), listener.handle);
        });
    }

    /**
     * @param {string} version
     */
    private mountRoutes(version: string): void {
        const router = express.Router();

        console.log(format('API version: %s', version));

        const options:cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false
        };

        router.use(cors(options));

        const docPath = path.join(__dirname + '/../apidoc');
        router.get('/doc/', (req, res) => {
            res.sendFile(`${docPath}/index.html`);
        });

        this.express.use('/doc/css', express.static(`${docPath}/css`));
        this.express.use('/doc/fonts', express.static(`${docPath}/fonts`));
        this.express.use('/doc/img', express.static(`${docPath}/img`));
        this.express.use('/doc/vendor', express.static(`${docPath}/vendor`));
        this.express.use('/doc', express.static(docPath));

        container.getAll<IRoutedController>(TYPES.Controller).forEach((instance: IRoutedController) => {
            const prefix = `/api/v${version}/${instance.resource()}/`;

            instance.routes().forEach((route: Route) => {
                const path = `${prefix}${route.path}`;
                const method = router[route.method];

                console.log(format('Route "%s" mounted on %s', path, route.method.toUpperCase()));
                method.apply(router, [path, route.action]);
            });

        });

        router.options("*", cors(options));

        this.express.use('/', router)
    }

    private handleException() {
        return function (err, req, res, next) {
            function isException(e: any): e is IException {
                return 'getCode' in e && 'getMessage' in e;
            }

            function composeException(e): ApiError {
                let error = new ApiError();

                if (isException(e)) {
                    const exception: IException = e;

                    error.message = exception.getMessage();
                    error.code = exception.getCode();
                }

                return error;
            }

            if (isException(err)) {
                let result = new ResultSet();

                result.error = composeException(err);

                res.statusCode = result.error.code;
                res.set('Status', result.error.message);

                res.json(result.toJson());
            } else {
                next();
            }
        }
    }
}