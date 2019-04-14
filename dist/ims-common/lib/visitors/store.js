"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class StoreVisitor extends ims_decorator_1.NullAstVisitor {
    visitClass(ast, context) {
        if (ims_core_1.isStoreClassAst(ast)) {
            return new ims_core_1.StoreAst(ast, context);
        }
    }
    visitProperty(ast, context) {
        if (ims_core_1.isInputPropertyAst(ast)) {
            return new ims_core_1.InputAst(ast, context);
        }
    }
    visitMethod(ast, context) {
        if (ims_core_1.isActionMethodAst(ast)) {
            return new ims_core_1.ActionAst(ast, context);
        }
    }
}
exports.StoreVisitor = StoreVisitor;
