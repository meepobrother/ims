"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.InjectMetadataKey = 'InjectMetadataKey';
exports.Inject = ims_decorator_1.makeDecorator(exports.InjectMetadataKey);
function isInjectPropertyAst(val) {
    return val.metadataKey === exports.InjectMetadataKey;
}
exports.isInjectPropertyAst = isInjectPropertyAst;
class InjectAst extends ims_decorator_1.PropertyContext {
    inject() {
        return this.context.inject(this.ast.metadataDef || this.ast.propertyType);
    }
}
exports.InjectAst = InjectAst;
