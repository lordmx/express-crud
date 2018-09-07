import * as mongoose from 'mongoose';
import * as Transaction from 'mongoose-transactions';

export interface IRead<T> {
    retrieve: (callback: (error: any, result: any) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;
    findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T>;
    find(cond: Object, fields: Object, options: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]>;
}

export interface IWrite<T> {
    create: (item: T, callback: (error: any, result: any) => void) => void;
    update: (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
}

export class BaseRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<mongoose.Document>;
    private _transactions: Transaction[];

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
        this._transactions = [];
    }

    begin(): void {
        this._transactions.push(new Transaction());
    }

    async rollback(callback: (error: any) => void) {
        if (this._transactions.length > 0) {
            let transaction = this._transactions.pop();
            await transaction.rollback().catch(callback);
            transaction.clean()
        }
    }

    async commit() {
        if (this._transactions.length > 0) {
            let transaction = this._transactions.pop();
            await transaction.run()
        }
    }

    activeTransaction(): Transaction | mongoose.Model<mongoose.Document> {
        if (this._transactions.length > 0) {
            return this._transactions[this._transactions.length - 1];
        }

        return this._model;
    }

    create(item: T, callback: (error: any, result: T) => void) {
        this.activeTransaction().create(item, callback);
    }

    retrieve(callback: (error: any, result: T) => void) {
        this._model.find({}, callback);
    }

    update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this.activeTransaction().update({ _id: _id }, item, callback);
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this.activeTransaction().remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }

    findById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(_id, callback);
    }

    findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T> {
        return this._model.findOne(cond, callback);
    }

    find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]> {
        return this._model.find(cond, options, callback);
    }

    count(cond?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T> {
        return this._model.count(cond, callback);
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }

}
