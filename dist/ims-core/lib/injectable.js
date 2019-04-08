"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.InjectableMetadataKey = 'InjectableMetadataKey';
exports.Injectable = ims_decorator_1.makeDecorator(exports.InjectableMetadataKey);
class InjectableAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.InjectableAst = InjectableAst;
function isInjectableClassAst(val) {
    return val.metadataKey === exports.InjectableMetadataKey;
}
exports.isInjectableClassAst = isInjectableClassAst;
