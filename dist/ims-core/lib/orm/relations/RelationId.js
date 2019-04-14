"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.RelationIdMetadataKey = 'RelationIdMetadataKey';
exports.RelationId = ims_decorator_1.makeDecorator(exports.RelationIdMetadataKey);
function isRelationIdPropertyAst(val) {
    return val.metadataKey === exports.RelationIdMetadataKey;
}
exports.isRelationIdPropertyAst = isRelationIdPropertyAst;
class RelationIdAst extends ims_decorator_1.PropertyContext {
}
exports.RelationIdAst = RelationIdAst;
