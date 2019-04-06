"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.JoinColumnMetadataKey = 'JoinColumnMetadataKey';
exports.JoinColumn = ims_decorator_1.makeDecorator(exports.JoinColumnMetadataKey);
function isJoinColumnPropertyAst(val) {
    return val.metadataKey === exports.JoinColumnMetadataKey;
}
exports.isJoinColumnPropertyAst = isJoinColumnPropertyAst;
class JoinColumnAst extends ims_decorator_1.PropertyContext {
}
exports.JoinColumnAst = JoinColumnAst;
