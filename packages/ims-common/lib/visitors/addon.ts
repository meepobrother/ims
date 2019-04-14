import { NullAstVisitor, ClassAst, ParserAstContext, ParameterAst, MethodAst } from 'ims-decorator';
import {
    isAddonClassAst, AddonAst, isControllerClassAst, ControllerAst,
    isRenderParameterAst, RenderAst,
    isTemplateClassAst, TemplateAst, isRoleMethodAst, RoleMethodAst,
    isRoleParameterAst, RoleParameterAst
} from 'ims-core';

export class AddonVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        if (isAddonClassAst(ast)) {
            return new AddonAst(ast, context)
        }
        if (isControllerClassAst(ast)) {
            return new ControllerAst(ast, context)
        }
        if (isTemplateClassAst(ast)) {
            return new TemplateAst(ast, context)
        }
    }
    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        if (isRenderParameterAst(ast)) {
            return new RenderAst(ast, context)
        }
        if (isRoleParameterAst(ast)) {
            return new RoleParameterAst(ast, context)
        }
    }
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        if (isRoleMethodAst(ast)) {
            return new RoleMethodAst(ast, context)
        }
    }
}