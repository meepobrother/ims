"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.BeforeRemoveMetadataKey = 'BeforeRemoveMetadataKey';
exports.BeforeRemove = ims_decorator_1.makeDecorator(exports.BeforeRemoveMetadataKey);
class BeforeRemoveAst extends ims_decorator_1.PropertyContext {
}
exports.BeforeRemoveAst = BeforeRemoveAst;
function isBeforeRemovePropertyAst(val) {
    return val.metadataKey === exports.BeforeRemoveMetadataKey;
}
exports.isBeforeRemovePropertyAst = isBeforeRemovePropertyAst;
