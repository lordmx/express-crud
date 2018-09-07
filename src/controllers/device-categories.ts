import { IRoutedController, BaseController } from '../infrastructure/controller';
import { ResultSet, Metadata } from '../infrastructure/result';
import { Context } from '../infrastructure/context';
import { injectable, inject } from 'inversify';
import { DeviceCategory, IDeviceCategoryModel, Condition } from "../models/device-category";
import { Criteria } from "../infrastructure/criteria";
import { InternalErrorException } from "../infrastructure/exceptions";

import TYPES from '../types';

@injectable()
export class DeviceCategoriesController extends BaseController<DeviceCategory, Condition> implements IRoutedController {

    constructor(@inject(TYPES.Context) context: Context) {
        super(DeviceCategory);
    }

        /**
     * @returns {string}
     */
    resource(): string {
        return 'device-categories';
    }

    /**
     * @api {get} /device-categories Регистрация нового запроса
     * @apiVersion 1.0.0
     * @apiName DeviceCategoriesList
     * @apiGroup DeviceCategories
     * @apiPermission none
     *
     * @apiExample Пример использования:
     * curl -i http://localhost/api/v1/device-categories?parent_id=<some-id> -X GET
     *
     * @apiUse HeaderContentType
     * @apiUse DeviceCategory
     *
     * @apiParam {String} parentId Родительская категория
     *
     * @apiUse Error400
     * @apiUse Error401
     * @apiUse Error500
     *
     * @apiUse Request
     *
     * @param {Criteria} criteria
     * @return {Promise<ResultSet>}
     */
    async get(criteria: Criteria<Condition>): Promise<ResultSet> {
        let result = new ResultSet();
        let models = await DeviceCategory.getList(criteria).then((res) => {
            return res;
        }, (err) => {
            if (err) {
                throw new InternalErrorException()
            }
        });
        let count = await DeviceCategory.getCount(criteria.cond).then((res) => {
            return res;
        }, (err) => {
            if (err) {
                throw new InternalErrorException()
            }
        });

        let list: DeviceCategory[] = [];
        (models as IDeviceCategoryModel[]).map((model) => {
            list.push(new DeviceCategory(model))
        });

        result.list = list;
        result.metadata = new Metadata();
        result.metadata.total = count as number;
        result.metadata.page = criteria.page;
        result.metadata.pageCount = Math.ceil(count as number / criteria.perPage);
        result.metadata.perPage = criteria.perPage;

        return result;
    }

}
