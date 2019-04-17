"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.BeforeUpdateMetadataKey = 'BeforeUpdateMetadataKey';
exports.BeforeUpdate = ims_decorator_1.makeDecorator(exports.BeforeUpdateMetadataKey);
class BeforeUpdateAst extends ims_decorator_1.PropertyContext {
}
exports.BeforeUpdateAst = BeforeUpdateAst;
function isBeforeUpdatePropertyAst(val) {
    return val.metadataKey === exports.BeforeUpdateMetadataKey;
}
exports.isBeforeUpdatePropertyAst = isBeforeUpdatePropertyAst;
