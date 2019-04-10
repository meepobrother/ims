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
class PatchAst extends method_1.HttpMethodContext {
}
exports.PatchAst = PatchAst;
