"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.InputMetadataKey = 'InputMetadataKey';
exports.Input = ims_common_1.makeDecorator(exports.InputMetadataKey);
class InputAst extends ims_common_1.PropertyContext {
}
exports.InputAst = InputAst;
function isInputPropertyAst(val) {
    return val.metadataKey === exports.InputMetadataKey;
}
exports.isInputPropertyAst = isInputPropertyAst;
