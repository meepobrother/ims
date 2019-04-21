import { NullAstVisitor, ClassAst, ParserAstContext, ParameterAst, MethodAst } from 'ims-decorator';
import { AddonAst, ControllerAst, RenderAst, TemplateAst, RoleMethodAst, RoleParameterAst } from 'ims-core';
export declare class AddonVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): AddonAst | ControllerAst | TemplateAst;
    visitParameter(ast: ParameterAst, context: ParserAstContext): RoleParameterAst | RenderAst;
    visitMethod(ast: MethodAst, context: ParserAstContext): RoleMethodAst;
}
