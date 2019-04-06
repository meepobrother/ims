"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.InjectMetadataKey = 'InjectMetadataKey';
exports.Inject = ims_common_1.makeDecorator(exports.InjectMetadataKey);
function isInjectPropertyAst(val) {
    return val.metadataKey === exports.InjectMetadataKey;
}
exports.isInjectPropertyAst = isInjectPropertyAst;
class InjectAst extends ims_common_1.PropertyContext {
    inject() {
        return this.context.inject(this.ast.metadataDef || this.ast.propertyType);
    }
}
exports.InjectAst = InjectAst;
