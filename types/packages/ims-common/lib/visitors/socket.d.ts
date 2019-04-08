import { ParameterAst, PropertyAst, NullAstVisitor, MethodAst, ParserAstContext, ClassAst } from 'ims-decorator';
import { OnAst, ServerAst, SocketAst } from 'ims-core';
export declare class SocketVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): void;
    visitMethod(ast: MethodAst, context: ParserAstContext): OnAst;
    visitParameter(ast: ParameterAst, context: ParserAstContext): SocketAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): ServerAst;
}
