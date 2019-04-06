"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.UniqueMetadataKey = 'UniqueMetadataKey';
exports.Unique = ims_decorator_1.makeDecorator(exports.UniqueMetadataKey);
class UniqueAst extends ims_decorator_1.PropertyContext {
}
exports.UniqueAst = UniqueAst;
function isUniquePropertyAst(val) {
    return val.metadataKey === exports.UniqueMetadataKey;
}
exports.isUniquePropertyAst = isUniquePropertyAst;
