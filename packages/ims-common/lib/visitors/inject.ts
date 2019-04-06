import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst } from 'ims-decorator';
import { isInjectPropertyAst, isInjectableClassAst, InjectableAst, InjectAst } from 'ims-core';

export class InjectVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        if (isInjectableClassAst(ast)) {
            return new InjectableAst(ast, context);
        }
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        if (isInjectPropertyAst(ast)) {
            return new InjectAst(ast, context);
        }
    }
}