import { IResource} from "./resource";

export const DEFAULT_LIMIT = 20;

export class Metadata {
    public total: number;
    public perPage: number;
    public pageCount: number;
    public page: number;
}

export class ApiError {
    public code: number;
    public message: string;
}

export class ResultSet implements IResource {
    constructor(list?: IResource[], metadata?: Metadata) {
        this.list = list || [];
        this.metadata = metadata || new Metadata();
    }

    getId(): string {
        return null;
    }

    public list: IResource[];
    public metadata: Metadata;
    public error: ApiError;

    toJson() {
        let list = [];

        this.list.map((row: IResource) => {
            list.push(row.toJson())
        });

        return {
            list: list,
            metadata: {
                total: this.metadata.total || list.length,
                perPage: this.metadata.perPage || DEFAULT_LIMIT,
                pageCount: this.metadata.pageCount || 1,
                page: this.metadata.page || 1
            },
            error: this.error ? { code: this.error.code, message: this.error.message } : null
        }
    }
}
