import { NullAstVisitor, OnAst, MethodAst, ParserAstContext, ClassAst, SocketAst } from 'ims-common';
import { ParameterAst, PropertyAst } from 'ims-decorator';
import { ServerAst } from 'ims-core';
export declare class SocketVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): void;
    visitMethod(ast: MethodAst, context: ParserAstContext): OnAst;
    visitParameter(ast: ParameterAst, context: ParserAstContext): SocketAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): ServerAst;
}
