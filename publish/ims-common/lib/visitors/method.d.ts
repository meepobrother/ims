import { NullAstVisitor, MethodAst, ParserAstContext, PropertyAst } from 'ims-decorator';
import { GetMethodAst, PostMethodAst, DeleteMethodAst, PutMethodAst, HeadMethodAst, PatchMethodAst, GetPropertyAst, PostPropertyAst, DeletePropertyAst, PatchPropertyAst, PutPropertyAst, HeadPropertyAst } from 'ims-core';
export declare class MethodVisitor extends NullAstVisitor {
    visitProperty(ast: PropertyAst, context: ParserAstContext): DeletePropertyAst | GetPropertyAst | HeadPropertyAst | PatchPropertyAst | PostPropertyAst | PutPropertyAst;
    visitMethod(ast: MethodAst, context: ParserAstContext): DeleteMethodAst | GetMethodAst | HeadMethodAst | PatchMethodAst | PostMethodAst | PutMethodAst;
}
