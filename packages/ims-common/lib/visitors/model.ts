import { NullAstVisitor, ClassAst, ParserAstContext } from 'ims-decorator';
import { isModuleClassAst, ModuleAst } from 'ims-core';

export class ModuleVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        if (isModuleClassAst(ast)) {
            return new ModuleAst(ast, context)
        }
    }
}