import { ParameterAst, PropertyAst, NullAstVisitor, MethodAst, ParserAstContext, ClassAst, } from 'ims-decorator';
import { isOnMethodAst, OnAst, isServerPropertyAst, ServerAst, isSocketParameterAst, SocketAst } from 'ims-core';
export class SocketVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) { }
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        if (isOnMethodAst(ast)) {
            return new OnAst(ast, context)
        }
    }
    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        if (isSocketParameterAst(ast)) {
            return new SocketAst(ast, context)
        }
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        if (isServerPropertyAst(ast)) {
            return new ServerAst(ast, context)
        }
    }
}
