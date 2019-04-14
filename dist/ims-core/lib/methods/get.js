"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const method_1 = require("./method");
exports.GetMetadataKey = 'GetMetadataKey';
exports.Get = ims_decorator_1.makeDecorator(exports.GetMetadataKey);
function isGetMethodAst(val) {
    return val.metadataKey === exports.GetMetadataKey;
}
exports.isGetMethodAst = isGetMethodAst;
class GetMethodAst extends method_1.HttpMethodContext {
}
exports.GetMethodAst = GetMethodAst;
function isGetPropertyAst(val) {
    return val.metadataKey === exports.GetMetadataKey;
}
exports.isGetPropertyAst = isGetPropertyAst;
class GetPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.GetPropertyAst = GetPropertyAst;
