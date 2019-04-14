"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.InputMetadataKey = 'InputMetadataKey';
exports.Input = ims_decorator_1.makeDecorator(exports.InputMetadataKey);
class InputAst extends ims_decorator_1.PropertyContext {
}
exports.InputAst = InputAst;
function isInputPropertyAst(val) {
    return val.metadataKey === exports.InputMetadataKey;
}
exports.isInputPropertyAst = isInputPropertyAst;
