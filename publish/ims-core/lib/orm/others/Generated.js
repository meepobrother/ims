"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.GeneratedMetadataKey = 'GeneratedMetadataKey';
exports.Generated = ims_decorator_1.makeDecorator(exports.GeneratedMetadataKey);
class GeneratedAst extends ims_decorator_1.PropertyContext {
}
exports.GeneratedAst = GeneratedAst;
function isGeneratedPropertyAst(val) {
    return val.metadataKey === exports.GeneratedMetadataKey;
}
exports.isGeneratedPropertyAst = isGeneratedPropertyAst;
