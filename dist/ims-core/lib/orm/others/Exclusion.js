"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ExclusionMetadataKey = 'ExclusionMetadataKey';
exports.Exclusion = ims_decorator_1.makeDecorator(exports.ExclusionMetadataKey);
class ExclusionAst extends ims_decorator_1.PropertyContext {
}
exports.ExclusionAst = ExclusionAst;
function isExclusionPropertyAst(val) {
    return val.metadataKey === exports.ExclusionMetadataKey;
}
exports.isExclusionPropertyAst = isExclusionPropertyAst;
