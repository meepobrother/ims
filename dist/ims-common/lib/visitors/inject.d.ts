import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst } from 'ims-decorator';
import { InjectableAst, InjectAst } from 'ims-core';
export declare class InjectVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): InjectableAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): InjectAst;
}
