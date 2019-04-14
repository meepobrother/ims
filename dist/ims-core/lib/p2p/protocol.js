"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ProtocolMetadataKey = 'ProtocolMetadataKey';
exports.Protocol = ims_decorator_1.makeDecorator(exports.ProtocolMetadataKey);
// 属性
function isProtocolPropertyAst(val) {
    return val.metadataKey === exports.ProtocolMetadataKey;
}
exports.isProtocolPropertyAst = isProtocolPropertyAst;
class ProtocolPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ProtocolPropertyAst = ProtocolPropertyAst;
// 方法
function isProtocolMethodAst(val) {
    return val.metadataKey === exports.ProtocolMetadataKey;
}
exports.isProtocolMethodAst = isProtocolMethodAst;
class ProtocolMethodAst extends ims_decorator_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.name = def || ast.propertyKey;
    }
}
exports.ProtocolMethodAst = ProtocolMethodAst;
// 参数
function isProtocolParameterAst(val) {
    return val.metadataKey === exports.ProtocolMetadataKey;
}
exports.isProtocolParameterAst = isProtocolParameterAst;
class ProtocolParameterAst extends ims_decorator_1.ParameterContext {
}
exports.ProtocolParameterAst = ProtocolParameterAst;
