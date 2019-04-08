"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const method_1 = require("./method");
exports.PutMetadataKey = 'PutMetadataKey';
exports.Put = ims_decorator_1.makeDecorator(exports.PutMetadataKey);
function isPutMethodAst(val) {
    return val.metadataKey === exports.PutMetadataKey;
}
exports.isPutMethodAst = isPutMethodAst;
class PutAst extends method_1.HttpMethodContext {
}
exports.PutAst = PutAst;
