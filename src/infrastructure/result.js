"use strict";
exports.__esModule = true;
exports.DEFAULT_LIMIT = 20;
var Metadata = (function () {
    function Metadata() {
    }
    return Metadata;
}());
exports.Metadata = Metadata;
var Error = (function () {
    function Error() {
    }
    return Error;
}());
exports.Error = Error;
var ResultSet = (function () {
    function ResultSet(list, metadata) {
        this.list = list || [];
        this.metadata = metadata || new Metadata();
    }
    ResultSet.prototype.getId = function () {
        return null;
    };
    ResultSet.prototype.toJson = function () {
        var list = [];
        this.list.map(function (row) {
            list.push(row.toJson());
        });
        return {
            list: list,
            metadata: {
                total: this.metadata.total || list.length,
                perPage: this.metadata.perPage || exports.DEFAULT_LIMIT,
                pageCount: this.metadata.pageCount || 1,
                page: this.metadata.page || 1
            },
            error: this.error ? { code: this.error.code, message: this.error.message } : null
        };
    };
    return ResultSet;
}());
exports.ResultSet = ResultSet;
