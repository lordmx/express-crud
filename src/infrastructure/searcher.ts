import { BaseRepository } from "./repository";
import { Criteria } from "./criteria";
import { IResource } from "./resource";

export interface ISearcher<M extends IResource, R extends BaseRepository<any>, C> {
    /**
     * @param {C} cond
     * @returns {Promise<number>}
     */
    getCount(cond: C): Promise<number>;

    /**
     * @param {Criteria<C>} criteria
     * @returns {Promise<M[]>}
     */
    getList(criteria: Criteria<C>): Promise<M[]>;

    /**
     * @param {string} id
     * @returns {Promise<M extends IResource>}
     */
    findById(id: string): Promise<M>;
}

export abstract class BaseSearcher<M extends IResource, R extends BaseRepository<any>, C extends Object> implements ISearcher<M, R, C> {
    protected _repo: R;
    protected _modelCreator: {new(...args: any[]): M};

    /**
     * @param {R} repo
     * @param {{new(...args: any[]): M}} modelCreator
     */
    constructor(repo: R, modelCreator: {new(...args: any[]): M}) {
        this._repo = repo;
        this._modelCreator = modelCreator;
    }

    /**
     * @param {C} cond
     * @returns {Promise<number>}
     */
    getCount(cond: C) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._repo
                .count(cond)
                .exec((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }

    /**
     * @param {Criteria<C>} criteria
     * @returns {Promise<M[]>}
     */
    getList(criteria: Criteria<C>) : Promise<M[]> {
        return new Promise<M[]>((resolve, reject) => {
            this._repo
                .find(criteria.cond)
                .sort(criteria.sort)
                .limit(criteria.perPage)
                .select(criteria.fields)
                .skip(criteria.perPage * (criteria.page - 1))
                .exec((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (res.length) {
                            let result: M[] = [], creator = this._modelCreator;

                            (res).map((model) => {
                                result.push(new creator(model))
                            });

                            resolve(result);
                        }
                        else {
                            resolve([]);
                        }
                    }
                });
        });
    }

    /**
     * @param {string} id
     * @returns {Promise<M extends IResource>}
     */
    findById(id: string) : Promise<M> {
        return new Promise<M>((resolve, reject) => {
            this._repo.findById(id, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    let creator = this._modelCreator;
                    resolve(new creator(res));
                }
            });
        });
    }
}