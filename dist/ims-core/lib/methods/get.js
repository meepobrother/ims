"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const method_1 = require("./method");
exports.GetMetadataKey = 'GetMetadataKey';
exports.Get = ims_common_1.makeDecorator(exports.GetMetadataKey);
function isGetMethodAst(val) {
    return val.metadataKey === exports.GetMetadataKey;
}
exports.isGetMethodAst = isGetMethodAst;
class GetAst extends method_1.HttpMethodContext {
}
exports.GetAst = GetAst;
