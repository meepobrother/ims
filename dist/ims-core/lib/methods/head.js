"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.HeadMetadataKey = 'HeadMetadataKey';
const method_1 = require("./method");
exports.Head = ims_decorator_1.makeDecorator(exports.HeadMetadataKey);
function isHeadMethodAst(val) {
    return val.metadataKey === exports.HeadMetadataKey;
}
exports.isHeadMethodAst = isHeadMethodAst;
class HeadAst extends method_1.HttpMethodContext {
}
exports.HeadAst = HeadAst;
