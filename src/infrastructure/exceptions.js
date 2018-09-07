"use strict";
exports.__esModule = true;
var AbstractException = (function () {
    function AbstractException() {
    }
    return AbstractException;
}());
var NotFoundException = (function () {
    function NotFoundException() {
    }
    NotFoundException.prototype.getCode = function () {
        return 404;
    };
    NotFoundException.prototype.getMessage = function () {
        return 'Not Found';
    };
    return NotFoundException;
}());
exports.NotFoundException = NotFoundException;
var BadRequestException = (function () {
    function BadRequestException() {
    }
    BadRequestException.prototype.getCode = function () {
        return 400;
    };
    BadRequestException.prototype.getMessage = function () {
        return 'Bad Request';
    };
    return BadRequestException;
}());
exports.BadRequestException = BadRequestException;
var InternalErrorException = (function () {
    function InternalErrorException() {
    }
    InternalErrorException.prototype.getCode = function () {
        return 500;
    };
    InternalErrorException.prototype.getMessage = function () {
        return 'Internal Error';
    };
    return InternalErrorException;
}());
exports.InternalErrorException = InternalErrorException;
var UnauthorizedException = (function () {
    function UnauthorizedException() {
    }
    UnauthorizedException.prototype.getCode = function () {
        return 401;
    };
    UnauthorizedException.prototype.getMessage = function () {
        return 'Unauthorized';
    };
    return UnauthorizedException;
}());
exports.UnauthorizedException = UnauthorizedException;
var MethodNotAllowedException = (function () {
    function MethodNotAllowedException() {
    }
    MethodNotAllowedException.prototype.getCode = function () {
        return 405;
    };
    MethodNotAllowedException.prototype.getMessage = function () {
        return 'Method Not Allowed';
    };
    return MethodNotAllowedException;
}());
exports.MethodNotAllowedException = MethodNotAllowedException;
