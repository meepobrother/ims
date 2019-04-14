"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.RelationCountMetadataKey = 'RelationCountMetadataKey';
exports.RelationCount = ims_decorator_1.makeDecorator(exports.RelationCountMetadataKey);
function isRelationCountPropertyAst(val) {
    return val.metadataKey === exports.RelationCountMetadataKey;
}
exports.isRelationCountPropertyAst = isRelationCountPropertyAst;
class RelationCountAst extends ims_decorator_1.PropertyContext {
}
exports.RelationCountAst = RelationCountAst;
