"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.ReducerMetadataKey = 'ReducerMetadataKey';
exports.Reducer = ims_common_1.makeDecorator(exports.ReducerMetadataKey);
class ReducerAst extends ims_common_1.MethodContext {
}
exports.ReducerAst = ReducerAst;
function isReducerMethodAst(val) {
    return val.metadataKey === exports.ReducerMetadataKey;
}
exports.isReducerMethodAst = isReducerMethodAst;
