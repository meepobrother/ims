"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ChildEntityMetadataKey = 'ChildEntityMetadataKey';
exports.ChildEntity = ims_decorator_1.makeDecorator(exports.ChildEntityMetadataKey);
function isChildEntityClassAst(val) {
    return val.metadataKey === exports.ChildEntityMetadataKey;
}
exports.isChildEntityClassAst = isChildEntityClassAst;
class ChildEntityAst extends ims_decorator_1.ClassContext {
}
exports.ChildEntityAst = ChildEntityAst;
