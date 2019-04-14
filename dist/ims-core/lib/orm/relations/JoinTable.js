"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.JoinTableMetadataKey = 'JoinTableMetadataKey';
exports.JoinTable = ims_decorator_1.makeDecorator(exports.JoinTableMetadataKey);
function isJoinTablePropertyAst(val) {
    return val.metadataKey === exports.JoinTableMetadataKey;
}
exports.isJoinTablePropertyAst = isJoinTablePropertyAst;
class JoinTableAst extends ims_decorator_1.PropertyContext {
}
exports.JoinTableAst = JoinTableAst;
