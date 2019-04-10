import { ParameterAst, PropertyAst, NullAstVisitor, MethodAst, ParserAstContext, ClassAst } from 'ims-decorator';
import { OnAst, ServerAst, SocketAst, P2pAst, P2pParameterAst } from 'ims-core';
export declare class SocketVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): void;
    visitMethod(ast: MethodAst, context: ParserAstContext): OnAst | P2pAst;
    visitParameter(ast: ParameterAst, context: ParserAstContext): SocketAst | P2pParameterAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): ServerAst;
}
