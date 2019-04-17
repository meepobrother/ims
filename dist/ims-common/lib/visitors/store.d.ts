import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst, MethodAst } from 'ims-decorator';
import { StoreAst, ActionAst, InputAst } from 'ims-core';
export declare class StoreVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): StoreAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): InputAst;
    visitMethod(ast: MethodAst, context: ParserAstContext): ActionAst;
}
