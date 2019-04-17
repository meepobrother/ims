import { ParameterAst, PropertyAst, NullAstVisitor, MethodAst, ParserAstContext } from 'ims-decorator';
import { P2pPropertyAst, SocketParameterAst, SocketMethodAst } from 'ims-core';
export declare class SocketVisitor extends NullAstVisitor {
    visitMethod(ast: MethodAst, context: ParserAstContext): SocketMethodAst;
    visitParameter(ast: ParameterAst, context: ParserAstContext): SocketParameterAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): P2pPropertyAst;
}
