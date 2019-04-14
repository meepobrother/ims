"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class InjectVisitor extends ims_decorator_1.NullAstVisitor {
    visitClass(ast, context) {
        if (ims_core_1.isInjectableClassAst(ast)) {
            return new ims_core_1.InjectableAst(ast, context);
        }
    }
    visitProperty(ast, context) {
        if (ims_core_1.isInjectPropertyAst(ast)) {
            return new ims_core_1.InjectAst(ast, context);
        }
    }
}
exports.InjectVisitor = InjectVisitor;
