"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.ActionMetadataKey = 'ActionMetadataKey';
exports.Action = ims_common_1.makeDecorator(exports.ActionMetadataKey);
class ActionAst extends ims_common_1.MethodContext {
}
exports.ActionAst = ActionAst;
function isActionMethodAst(val) {
    return val.metadataKey === exports.ActionMetadataKey;
}
exports.isActionMethodAst = isActionMethodAst;
