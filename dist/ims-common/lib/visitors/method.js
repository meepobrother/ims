"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class MethodVisitor extends ims_decorator_1.NullAstVisitor {
    visitMethod(ast, context) {
        if (ims_core_1.isGetMethodAst(ast)) {
            return new ims_core_1.GetAst(ast, context);
        }
        if (ims_core_1.isPostMethodAst(ast)) {
            return new ims_core_1.PostAst(ast, context);
        }
        if (ims_core_1.isDeleteMethodAst(ast)) {
            return new ims_core_1.DeleteAst(ast, context);
        }
        if (ims_core_1.isPutMethodAst(ast)) {
            return new ims_core_1.PutAst(ast, context);
        }
        if (ims_core_1.isOptionMethodAst(ast)) {
            return new ims_core_1.OptionAst(ast, context);
        }
        if (ims_core_1.isHeadMethodAst(ast)) {
            return new ims_core_1.HeadAst(ast, context);
        }
        if (ims_core_1.isPatchMethodAst(ast)) {
            return new ims_core_1.PatchAst(ast, context);
        }
    }
}
exports.MethodVisitor = MethodVisitor;
