import * as mongoose from 'mongoose';

import { IResource } from '../infrastructure/resource'
import { IModel } from '../infrastructure/model'

export interface IDeviceCategoryModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    alias: string;
    parent_id: string;
    is_active: boolean;
    is_system: boolean;
}

export class Condition {
    parent_id: string;
    alias: string;
    is_active: boolean = true;
    is_system: boolean = false;
}

export class DeviceCategory<IDeviceCategoryModel> implements IResource {

    private _model: IDeviceCategoryModel;

    constructor(model: IDeviceCategoryModel) {
        this._model = model;
    }

    getId(): string {
        return this._model._id.toString();
    }

    toJson(): Object {
        return {
            id: this._model._id.toString(),
            name: this._model.name || null,
            alias: this._model.alias || null,
            parent_id: this._model.parent_id || null,
        }
    }
}
