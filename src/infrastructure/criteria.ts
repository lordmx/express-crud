export class Criteria<T> {
    cond: T;
    fields: string[];
    sort: Object;
    perPage: number;
    page: number;
}
