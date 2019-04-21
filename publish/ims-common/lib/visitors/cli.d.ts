import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst } from 'ims-decorator';
import { CliClassAst, CommandClassAst, InputAst, VersionAst, OptionPropertyAst } from 'ims-core';
export declare class CliVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): CommandClassAst | CliClassAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): InputAst | VersionAst | OptionPropertyAst;
}
