import { NullAstVisitor, MethodAst, ParserAstContext } from 'ims-decorator';
import { GetAst, PostAst, DeleteAst, PutAst, OptionAst, HeadAst, PatchAst } from 'ims-core';
export declare class MethodVisitor extends NullAstVisitor {
    visitMethod(ast: MethodAst, context: ParserAstContext): GetAst | PostAst | DeleteAst | PutAst | OptionAst | HeadAst | PatchAst;
}
