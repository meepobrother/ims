"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.PubsubMetadataKey = 'PubsubMetadataKey';
exports.Pubsub = ims_decorator_1.makeDecorator(exports.PubsubMetadataKey);
// 方法
function isPubsubMethodAst(val) {
    return val.metadataKey === exports.PubsubMetadataKey;
}
exports.isPubsubMethodAst = isPubsubMethodAst;
class PubsubMethodAst extends ims_decorator_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.name = def || ast.propertyKey;
    }
}
exports.PubsubMethodAst = PubsubMethodAst;
// 属性
function isPubsubPropertyAst(val) {
    return val.metadataKey === exports.PubsubMetadataKey;
}
exports.isPubsubPropertyAst = isPubsubPropertyAst;
class PubsubPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.PubsubPropertyAst = PubsubPropertyAst;
