"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OnMetadataKey = 'OnMetadataKey';
exports.On = ims_decorator_1.makeDecorator(exports.OnMetadataKey);
function isOnMethodAst(val) {
    return val.metadataKey === exports.OnMetadataKey;
}
exports.isOnMethodAst = isOnMethodAst;
class OnAst extends ims_decorator_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.OnAst = OnAst;
