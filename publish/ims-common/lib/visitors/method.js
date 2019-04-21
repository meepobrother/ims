"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class MethodVisitor extends ims_decorator_1.NullAstVisitor {
    visitProperty(ast, context) {
        if (ims_core_1.isGetPropertyAst(ast)) {
            return new ims_core_1.GetPropertyAst(ast, context);
        }
        if (ims_core_1.isPostPropertyAst(ast)) {
            return new ims_core_1.PostPropertyAst(ast, context);
        }
        if (ims_core_1.isDeletePropertyAst(ast)) {
            return new ims_core_1.DeletePropertyAst(ast, context);
        }
        if (ims_core_1.isPatchPropertyAst(ast)) {
            return new ims_core_1.PatchPropertyAst(ast, context);
        }
        if (ims_core_1.isPutPropertyAst(ast)) {
            return new ims_core_1.PutPropertyAst(ast, context);
        }
        if (ims_core_1.isHeadPropertyAst(ast)) {
            return new ims_core_1.HeadPropertyAst(ast, context);
        }
    }
    visitMethod(ast, context) {
        if (ims_core_1.isGetMethodAst(ast)) {
            return new ims_core_1.GetMethodAst(ast, context);
        }
        if (ims_core_1.isPostMethodAst(ast)) {
            return new ims_core_1.PostMethodAst(ast, context);
        }
        if (ims_core_1.isDeleteMethodAst(ast)) {
            return new ims_core_1.DeleteMethodAst(ast, context);
        }
        if (ims_core_1.isPutMethodAst(ast)) {
            return new ims_core_1.PutMethodAst(ast, context);
        }
        if (ims_core_1.isHeadMethodAst(ast)) {
            return new ims_core_1.HeadMethodAst(ast, context);
        }
        if (ims_core_1.isPatchMethodAst(ast)) {
            return new ims_core_1.PatchMethodAst(ast, context);
        }
    }
}
exports.MethodVisitor = MethodVisitor;
