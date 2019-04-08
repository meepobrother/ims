"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ActionMetadataKey = 'ActionMetadataKey';
exports.Action = ims_decorator_1.makeDecorator(exports.ActionMetadataKey);
class ActionAst extends ims_decorator_1.MethodContext {
}
exports.ActionAst = ActionAst;
function isActionMethodAst(val) {
    return val.metadataKey === exports.ActionMetadataKey;
}
exports.isActionMethodAst = isActionMethodAst;
