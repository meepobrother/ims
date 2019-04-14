"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class AppVisitor extends ims_decorator_1.NullAstVisitor {
    visitClass(ast, context) {
        if (ims_core_1.isAppClassAst(ast)) {
            return new ims_core_1.AppAst(ast, context);
        }
    }
}
exports.AppVisitor = AppVisitor;
