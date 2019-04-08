"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const method_1 = require("./method");
exports.OptionMetadataKey = 'OptionMetadataKey';
exports.Option = ims_decorator_1.makeDecorator(exports.OptionMetadataKey);
function isOptionMethodAst(val) {
    return val.metadataKey === exports.OptionMetadataKey;
}
exports.isOptionMethodAst = isOptionMethodAst;
class OptionAst extends method_1.HttpMethodContext {
}
exports.OptionAst = OptionAst;
