"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.SocketMetadataKey = 'SocketMetadataKey';
exports.Socket = ims_decorator_1.makeDecorator(exports.SocketMetadataKey);
function isSocketPropertyAst(val) {
    return val.metadataKey === exports.SocketMetadataKey;
}
exports.isSocketPropertyAst = isSocketPropertyAst;
class SocketPropertyAst extends ims_decorator_1.PropertyContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.SocketPropertyAst = SocketPropertyAst;
function isSocketMethodAst(val) {
    return val.metadataKey === exports.SocketMetadataKey;
}
exports.isSocketMethodAst = isSocketMethodAst;
class SocketMethodAst extends ims_decorator_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.name = def || ast.propertyKey;
    }
}
exports.SocketMethodAst = SocketMethodAst;
function isSocketParameterAst(val) {
    return val.metadataKey === exports.SocketMetadataKey;
}
exports.isSocketParameterAst = isSocketParameterAst;
class SocketParameterAst extends ims_decorator_1.ParameterContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.SocketParameterAst = SocketParameterAst;
