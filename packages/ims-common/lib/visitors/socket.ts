import { ParameterAst, PropertyAst, NullAstVisitor, MethodAst, ParserAstContext, ClassAst, } from 'ims-decorator';
import { isSocketParameterAst, isP2pPrototypeAst, P2pPropertyAst, SocketParameterAst, isSocketMethodAst, SocketMethodAst } from 'ims-core';
export class SocketVisitor extends NullAstVisitor {
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        if (isSocketMethodAst(ast)) {
            return new SocketMethodAst(ast, context)
        }
    }
    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        if (isSocketParameterAst(ast)) {
            return new SocketParameterAst(ast, context)
        }
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        if (isP2pPrototypeAst(ast)) {
            return new P2pPropertyAst(ast, context)
        }
    }
}
