import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst, ParameterAst } from 'ims-decorator';
import {
    isAddonClassAst, AddonAst, isControllerClassAst, ControllerAst, isRenderParameterAst, RenderAst,
    isRouterClassAst, RouterAst, isRoleClassAst, RoleAst, isTemplateClassAst, TemplateAst
} from 'ims-core';

export class AddonVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        if (isAddonClassAst(ast)) {
            return new AddonAst(ast, context)
        }
        if (isControllerClassAst(ast)) {
            return new ControllerAst(ast, context)
        }
        if (isRouterClassAst(ast)) {
            return new RouterAst(ast, context)
        }
        if (isRoleClassAst(ast)) {
            return new RoleAst(ast, context)
        }
        if (isTemplateClassAst(ast)) {
            return new TemplateAst(ast, context)
        }
    }

    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        if (isRenderParameterAst(ast)) {
            return new RenderAst(ast, context)
        }
    }

    visitProperty(ast: PropertyAst, context: ParserAstContext) {

    }
}