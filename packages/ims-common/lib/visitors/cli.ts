import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst } from 'ims-decorator';
import { isCliClassAst, CliClassAst, isCommandClassAst, CommandClassAst, isInputPropertyAst, InputAst, isVersionPropertyAst, VersionAst, isOptionPropertyAst, OptionPropertyAst } from 'ims-core';
export class CliVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        if (isCliClassAst(ast)) {
            return new CliClassAst(ast, context)
        }
        if (isCommandClassAst(ast)) {
            return new CommandClassAst(ast, context)
        }
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        if (isInputPropertyAst(ast)) {
            return new InputAst(ast, context)
        }
        if (isVersionPropertyAst(ast)) {
            return new VersionAst(ast, context)
        }
        if (isOptionPropertyAst(ast)) {
            return new OptionPropertyAst(ast, context)
        }
    }
}