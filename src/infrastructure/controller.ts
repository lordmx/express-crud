import { ResultSet } from './result'
import { Criteria } from './criteria'
import { injectable } from 'inversify';
import { InternalErrorException, MethodNotAllowedException } from './exceptions';
import { BaseSearcher } from "./searcher";
import * as url from 'url';

export const HttpMethod = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

export interface IRestController<T extends BaseSearcher<any, any, C>, C> extends IRoutedController {
    get(criteria: Criteria<C>): Promise<ResultSet>;
    view(id: string): Promise<ResultSet>;
    delete(id: string): void;
    create(params: T): Promise<ResultSet>;
    update(id: string, data: Object): Promise<ResultSet>;
}

export type Action = (req, res, next) => void;

export class Route {
    path: string;
    method: string;
    action: Action;

    /**
     * @param {Action} action
     * @param {string} path
     * @param {string} method
     */
    constructor(action: Action, path:string = '', method: string = HttpMethod.GET) {
        this.action = action;
        this.path = path;
        this.method = method;
    }
}

export interface IRoutedController {
    routes(): Array<Route>;
    resource(): string;
}

@injectable()
export abstract class BaseController<T extends BaseSearcher<any, any, C>, C> implements IRestController<T, C> {
    tCreator: {new(...args: any[]): T};

    constructor(TCreator: { new (...args: any[]): T; }) {
        this.tCreator = TCreator;
    }

    /**
     * @returns {Array<Route>}
     */
    routes(): Array<Route> {
        return [
            new Route(this.initGet),
            new Route(this.initView, ':id/'),
            new Route(this.initCreate,'', HttpMethod.POST),
            new Route(this.initDelete, ':id/', HttpMethod.DELETE),
            new Route(this.initUpdate, ':id/', HttpMethod.PUT),
        ];
    }

    /**
     * @returns {string}
     */
    abstract resource(): string;

    /**
     * @param {Criteria<C>} criteria
     * @returns {Promise<ResultSet>}
     */
    async get(criteria: Criteria<C>): Promise<ResultSet> {
        throw new MethodNotAllowedException();
    }

    /**
     * @param {string} id
     * @returns {Promise<ResultSet>}
     */
    async view(id: string): Promise<ResultSet> {
        throw new MethodNotAllowedException();
    }

    /**
     * @param {string} id
     */
    delete(id: string): void {
        throw new MethodNotAllowedException();
    }

    /**
     * @param {string} id
     * @param {Object} data
     * @returns {Promise<ResultSet>}
     */
    async update(id: string, data: Object): Promise<ResultSet> {
        throw new MethodNotAllowedException();
    }

    /**
     * @param {object} params
     * @returns {Promise<ResultSet>}
     */
    async create(params: T): Promise<ResultSet> {
        throw new MethodNotAllowedException();
    }

    public initGet = (req, res, next) => {
        function explodeSort(sort: string): string[] {
            let result = [];

            (sort || '').split(',').map((part: string) => {
                part = part.replace(/ /g, '');

                if (!part) {
                    return;
                }

                if (part[0] === '-') {
                    result[part.substr(1)] = -1;
                } else if (part[0] === '+') {
                    result[part.substr(1)] = 1;
                } else {
                    result[part] = -1;
                }
            });

            return result;
        }

        let query = url.parse(req.url, true).query;
        const { limit, sort, fields, page } = query;

        ['limit', 'sort', 'fields', 'page', 'access_token'].map((key) => {
            delete(query[key])
        });

        let criteria = new Criteria<C>();
        criteria.cond = query;
        criteria.fields = fields;
        criteria.page = page ? page : 1;
        criteria.perPage = limit ? limit : 20;
        criteria.sort = explodeSort(sort);

        try {
            this.get(criteria)
                .then((result) => {
                    res.statusCode = 200;
                    res.set('Status', 'OK');

                    res.json(result.toJson())
                })
                .catch((e) => {
                    console.log(e);
                    next(e);
                });
        } catch (e) {
            console.log(e);
            next(e);
        }
    };

    public initView = (req, res, next) => {
        try {
            this.view(req.params.id)
                .then((result) => {
                    res.statusCode = 200;
                    res.set('Status', 'OK');

                    res.json(result.toJson());
                })
                .catch((e) => {
                    console.log(e);
                    next(e);
                });
        } catch (e) {
            console.log(e);
            next(new InternalErrorException())
        }
    };

    public initCreate = (req, res, next) => {
        try {
            const tCreator = this.tCreator;

            this.create(new tCreator(req.body))
                .then((result) => {
                    res.statusCode = 201;
                    res.set('Status', 'Created');
                    res.json(result.toJson())
                })
                .catch((e) => {
                    console.log(e);
                    next(new InternalErrorException());
                })
        } catch (e) {
            console.log(e);
            next(new InternalErrorException())
        }
    };

    public initDelete = (req, res, next) => {

    };

    public initUpdate= (req, res, next) => {

    };
}

export abstract class CrudController<T extends BaseSearcher<any, any, C>, C> implements IRestController<T, C> {
    constructor(TCreator: { new (...args: any[]): T; }) {

    }
}