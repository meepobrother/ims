"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ReducerMetadataKey = 'ReducerMetadataKey';
exports.Reducer = ims_decorator_1.makeDecorator(exports.ReducerMetadataKey);
class ReducerAst extends ims_decorator_1.MethodContext {
}
exports.ReducerAst = ReducerAst;
function isReducerMethodAst(val) {
    return val.metadataKey === exports.ReducerMetadataKey;
}
exports.isReducerMethodAst = isReducerMethodAst;
