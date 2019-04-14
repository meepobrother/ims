import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst } from 'ims-decorator';
import { CliAst, CommandAst, InputAst, VersionAst } from 'ims-core';
export declare class CliVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): CliAst | CommandAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): InputAst | VersionAst;
}
