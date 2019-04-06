"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.InjectableMetadataKey = 'InjectableMetadataKey';
exports.Injectable = ims_common_1.makeDecorator(exports.InjectableMetadataKey);
class InjectableAst extends ims_common_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.InjectableAst = InjectableAst;
function isInjectableClassAst(val) {
    return val.metadataKey === exports.InjectableMetadataKey;
}
exports.isInjectableClassAst = isInjectableClassAst;
