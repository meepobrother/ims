"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.IndexMetadataKey = 'IndexMetadataKey';
exports.Index = ims_decorator_1.makeDecorator(exports.IndexMetadataKey);
class IndexAst extends ims_decorator_1.PropertyContext {
}
exports.IndexAst = IndexAst;
function isIndexPropertyAst(val) {
    return val.metadataKey === exports.IndexMetadataKey;
}
exports.isIndexPropertyAst = isIndexPropertyAst;
