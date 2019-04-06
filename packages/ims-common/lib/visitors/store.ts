import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst, MethodAst } from 'ims-decorator';
import { isStoreClassAst, StoreAst, isActionMethodAst, ActionAst, isInputPropertyAst, InputAst } from 'ims-core';

export class StoreVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        if (isStoreClassAst(ast)) {
            return new StoreAst(ast, context)
        }
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        if (isInputPropertyAst(ast)) {
            return new InputAst(ast, context);
        }
    }
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        if (isActionMethodAst(ast)) {
            return new ActionAst(ast, context);
        }
    }
}