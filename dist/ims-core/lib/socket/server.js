"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ServerMetadataKey = 'ServerMetadataKey';
exports.Server = ims_decorator_1.makeDecorator(exports.ServerMetadataKey);
function isServerPropertyAst(val) {
    return val.metadataKey === exports.ServerMetadataKey;
}
exports.isServerPropertyAst = isServerPropertyAst;
class ServerAst extends ims_decorator_1.PropertyContext {
    constructor(ast, context) {
        super(ast, context);
    }
    getValue() {
        this.context.typeContext.get('ws:server');
    }
}
exports.ServerAst = ServerAst;
