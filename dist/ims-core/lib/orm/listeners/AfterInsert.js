"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AfterInsertMetadataKey = 'AfterInsertMetadataKey';
exports.AfterInsert = ims_decorator_1.makeDecorator(exports.AfterInsertMetadataKey);
class AfterInsertAst extends ims_decorator_1.PropertyContext {
}
exports.AfterInsertAst = AfterInsertAst;
function isAfterInsertPropertyAst(val) {
    return val.metadataKey === exports.AfterInsertMetadataKey;
}
exports.isAfterInsertPropertyAst = isAfterInsertPropertyAst;
