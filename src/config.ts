import { injectable } from "inversify";

@injectable()
export default class Config {
    private _topic: string;
    private _channel: string;

    constructor() {
        this._topic = process.env.NSQ_TOPIC;
        this._channel = process.env.NSQ_CHANNEL;
    }

    getTopic(): string {
        return this._topic;
    }
}