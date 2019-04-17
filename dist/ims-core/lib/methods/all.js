"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AllMetadataKey = 'AllMetadataKey';
const method_1 = require("./method");
exports.All = ims_decorator_1.makeDecorator(exports.AllMetadataKey);
function isAllMethodAst(val) {
    return val.metadataKey === exports.AllMetadataKey;
}
exports.isAllMethodAst = isAllMethodAst;
class AllMethodAst extends method_1.HttpMethodContext {
}
exports.AllMethodAst = AllMethodAst;
function isAllPropertyAst(val) {
    return val.metadataKey === exports.AllMetadataKey;
}
exports.isAllPropertyAst = isAllPropertyAst;
class AllPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.AllPropertyAst = AllPropertyAst;
