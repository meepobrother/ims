"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
;
exports.SocketMetadataKey = 'SocketMetadataKey';
exports.Socket = ims_decorator_1.makeDecorator(exports.SocketMetadataKey);
function isSocketParameterAst(val) {
    return val.metadataKey === exports.SocketMetadataKey;
}
exports.isSocketParameterAst = isSocketParameterAst;
class SocketAst extends ims_decorator_1.ParameterContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.SocketAst = SocketAst;
