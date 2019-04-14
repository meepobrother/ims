"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AfterRemoveMetadataKey = 'AfterRemoveMetadataKey';
exports.AfterRemove = ims_decorator_1.makeDecorator(exports.AfterRemoveMetadataKey);
class AfterRemoveAst extends ims_decorator_1.PropertyContext {
}
exports.AfterRemoveAst = AfterRemoveAst;
function isAfterRemovePropertyAst(val) {
    return val.metadataKey === exports.AfterRemoveMetadataKey;
}
exports.isAfterRemovePropertyAst = isAfterRemovePropertyAst;
