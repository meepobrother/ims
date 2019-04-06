import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst } from 'ims-decorator';
import { isCliClassAst, CliAst, isCommandClassAst, CommandAst, isInputPropertyAst, InputAst, isVersionPropertyAst, VersionAst } from 'ims-core';
export class CliVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        if (isCliClassAst(ast)) {
            return new CliAst(ast, context)
        }
        if (isCommandClassAst(ast)) {
            return new CommandAst(ast, context)
        }
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        if (isInputPropertyAst(ast)) {
            return new InputAst(ast, context)
        }
        if (isVersionPropertyAst(ast)) {
            return new VersionAst(ast, context)
        }
    }
}