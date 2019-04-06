import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst, ParameterAst } from 'ims-decorator';
import { AddonAst, ControllerAst, RenderAst, RouterAst, RoleAst, TemplateAst } from 'ims-core';
export declare class AddonVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): AddonAst | ControllerAst | RouterAst | RoleAst | TemplateAst;
    visitParameter(ast: ParameterAst, context: ParserAstContext): RenderAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): void;
}
