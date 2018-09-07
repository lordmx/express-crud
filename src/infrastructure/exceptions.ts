export interface IException {
    getCode(): number;
    getMessage(): string;
}

class AbstractException {
    public message: string;
}

export class NotFoundException implements IException {
    getCode(): number {
        return 404;
    }

    getMessage(): string {
        return 'Not Found';
    }
}

export class BadRequestException implements IException {
    getCode(): number {
        return 400;
    }

    getMessage(): string {
        return 'Bad Request';
    }
}

export class InternalErrorException implements IException {
    getCode(): number {
        return 500;
    }

    getMessage(): string {
        return 'Internal Error';
    }
}

export class UnauthorizedException implements IException {
    getCode(): number {
        return 401;
    }

    getMessage(): string {
        return 'Unauthorized';
    }
}

export class MethodNotAllowedException implements IException {
    getCode(): number {
        return 405;
    }

    getMessage(): string {
        return 'Method Not Allowed';
    }
}