"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PrimaryGeneratedColumnMetadataKey = 'PrimaryGeneratedColumnMetadataKey';
exports.PrimaryGeneratedColumn = ims_decorator_1.makeDecorator(exports.PrimaryGeneratedColumnMetadataKey);
function isPrimaryGeneratedColumnPropertyAst(val) {
    return val.metadataKey === exports.PrimaryGeneratedColumnMetadataKey;
}
exports.isPrimaryGeneratedColumnPropertyAst = isPrimaryGeneratedColumnPropertyAst;
class PrimaryGeneratedColumnAst extends ims_decorator_1.PropertyContext {
}
exports.PrimaryGeneratedColumnAst = PrimaryGeneratedColumnAst;
