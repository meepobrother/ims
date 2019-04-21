"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const method_1 = require("./method");
exports.PatchMetadataKey = 'PatchMetadataKey';
exports.Patch = ims_decorator_1.makeDecorator(exports.PatchMetadataKey);
function isPatchMethodAst(val) {
    return val.metadataKey === exports.PatchMetadataKey;
}
exports.isPatchMethodAst = isPatchMethodAst;
class PatchMethodAst extends method_1.HttpMethodContext {
}
exports.PatchMethodAst = PatchMethodAst;
function isPatchPropertyAst(val) {
    return val.metadataKey === exports.PatchMetadataKey;
}
exports.isPatchPropertyAst = isPatchPropertyAst;
class PatchPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.PatchPropertyAst = PatchPropertyAst;
