import { NullAstVisitor, ClassAst, ParserAstContext } from 'ims-decorator';
import { AppAst } from 'ims-core';
export declare class AppVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): AppAst;
}
