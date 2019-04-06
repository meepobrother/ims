"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const method_1 = require("./method");
exports.OptionMetadataKey = 'OptionMetadataKey';
exports.Option = ims_common_1.makeDecorator(exports.OptionMetadataKey);
function isOptionMethodAst(val) {
    return val.metadataKey === exports.OptionMetadataKey;
}
exports.isOptionMethodAst = isOptionMethodAst;
class OptionAst extends method_1.HttpMethodContext {
}
exports.OptionAst = OptionAst;
