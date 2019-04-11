import { ParameterAst, PropertyAst, NullAstVisitor, MethodAst, ParserAstContext, ClassAst, } from 'ims-decorator';
import { isOnMethodAst, OnAst, isServerPropertyAst, ServerAst, isSocketParameterAst, SocketAst, isP2pMethodAst, P2pAst, isP2pParameterAst, P2pParameterAst, isP2pPrototypeAst, P2pPropertyAst } from 'ims-core';
export class SocketVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) { }
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        if (isOnMethodAst(ast)) {
            return new OnAst(ast, context)
        }
        if (isP2pMethodAst(ast)) {
            return new P2pAst(ast, context)
        }
    }
    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        if (isSocketParameterAst(ast)) {
            return new SocketAst(ast, context)
        }
        if (isP2pParameterAst(ast)) {
            return new P2pParameterAst(ast, context)
        }
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        if (isServerPropertyAst(ast)) {
            return new ServerAst(ast, context)
        }
        if (isP2pPrototypeAst(ast)) {
            return new P2pPropertyAst(ast, context)
        }
    }
}
