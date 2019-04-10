"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class AddonVisitor extends ims_decorator_1.NullAstVisitor {
    visitClass(ast, context) {
        if (ims_core_1.isAddonClassAst(ast)) {
            return new ims_core_1.AddonAst(ast, context);
        }
        if (ims_core_1.isControllerClassAst(ast)) {
            return new ims_core_1.ControllerAst(ast, context);
        }
        if (ims_core_1.isRouterClassAst(ast)) {
            return new ims_core_1.RouterAst(ast, context);
        }
        if (ims_core_1.isRoleClassAst(ast)) {
            return new ims_core_1.RoleAst(ast, context);
        }
        if (ims_core_1.isTemplateClassAst(ast)) {
            return new ims_core_1.TemplateAst(ast, context);
        }
    }
    visitParameter(ast, context) {
        if (ims_core_1.isRenderParameterAst(ast)) {
            return new ims_core_1.RenderAst(ast, context);
        }
    }
    visitProperty(ast, context) {
    }
}
exports.AddonVisitor = AddonVisitor;
