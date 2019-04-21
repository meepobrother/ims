import { NullAstVisitor, ClassAst, ParserAstContext } from 'ims-decorator';
import { ModuleAst } from 'ims-core';
export declare class ModuleVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): ModuleAst;
}
