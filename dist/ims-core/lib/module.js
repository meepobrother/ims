"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.ModuleMetadataKey = 'ModuleMetadataKey';
exports.Module = ims_common_1.makeDecorator(exports.ModuleMetadataKey);
function isModuleClassAst(val) {
    return val.metadataKey === exports.ModuleMetadataKey;
}
exports.isModuleClassAst = isModuleClassAst;
class ModuleAst extends ims_common_1.ClassContext {
}
exports.ModuleAst = ModuleAst;
