"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class ModuleVisitor extends ims_decorator_1.NullAstVisitor {
    visitClass(ast, context) {
        if (ims_core_1.isModuleClassAst(ast)) {
            return new ims_core_1.ModuleAst(ast, context);
        }
    }
}
exports.ModuleVisitor = ModuleVisitor;
