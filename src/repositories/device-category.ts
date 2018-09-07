import * as mongoose from 'mongoose';

import { BaseRepository } from '../infrastructure/repository';
import { IDeviceCategoryModel } from '../models/device-category';

export let Schema = mongoose.Schema;

let schema = new Schema({
    name: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: false
    },
    parent_id: {
        type: String,
        required: false
    },
    is_system: {
        type: Boolean,
        required: true,
        default: false,
    },
    is_active: {
        type: Boolean,
        required: false,
        default: true
    },
});


export let DeviceCategorySchema = mongoose.model<IDeviceCategoryModel>('device-category', schema, 'device_categories', true);

export class DeviceCategoryRepository extends BaseRepository<IDeviceCategoryModel> {
    constructor() {
        super(DeviceCategorySchema);
    }
}

Object.seal(DeviceCategoryRepository);
