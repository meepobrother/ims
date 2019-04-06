"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TreeMetadataKey = 'TreeMetadataKey';
exports.Tree = ims_decorator_1.makeDecorator(exports.TreeMetadataKey);
function isTreeClassAst(val) {
    return val.metadataKey === exports.TreeMetadataKey;
}
exports.isTreeClassAst = isTreeClassAst;
class TreeAst extends ims_decorator_1.ClassContext {
}
exports.TreeAst = TreeAst;
