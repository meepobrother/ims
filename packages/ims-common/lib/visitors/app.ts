import { NullAstVisitor, ClassAst, ParserAstContext } from 'ims-decorator';
import { isAppClassAst, AppAst } from 'ims-core';
export class AppVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        if (isAppClassAst(ast)) {
            return new AppAst(ast, context)
        }
    }
}
