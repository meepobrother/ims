"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ModuleMetadataKey = 'ModuleMetadataKey';
exports.Module = ims_decorator_1.makeDecorator(exports.ModuleMetadataKey);
function isModuleClassAst(val) {
    return val.metadataKey === exports.ModuleMetadataKey;
}
exports.isModuleClassAst = isModuleClassAst;
class ModuleAst extends ims_decorator_1.ClassContext {
}
exports.ModuleAst = ModuleAst;
