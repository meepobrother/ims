"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TreeChildrenMetadataKey = 'TreeChildrenMetadataKey';
exports.TreeChildren = ims_decorator_1.makeDecorator(exports.TreeChildrenMetadataKey);
function isTreeChildrenPropertyAst(val) {
    return val.metadataKey === exports.TreeChildrenMetadataKey;
}
exports.isTreeChildrenPropertyAst = isTreeChildrenPropertyAst;
class TreeChildrenAst extends ims_decorator_1.PropertyContext {
}
exports.TreeChildrenAst = TreeChildrenAst;
