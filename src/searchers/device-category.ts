import { BaseSearcher } from "../infrastructure/searcher";
import { DeviceCategory } from "../models/device-category";
import { DeviceCategoryRepository } from "../repositories/device-category";

export class DeviceCategorySearcher<C extends Object> extends BaseSearcher<DeviceCategory<any>, DeviceCategoryRepository, C>  {
    constructor() {
        super(new DeviceCategoryRepository(), DeviceCategory);
    }
}