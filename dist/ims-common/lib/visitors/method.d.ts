import { NullAstVisitor, MethodAst, ParserAstContext, PropertyAst } from 'ims-decorator';
import { GetMethodAst, PostMethodAst, DeleteMethodAst, PutMethodAst, HeadMethodAst, PatchMethodAst, AllMethodAst, GetPropertyAst, PostPropertyAst, DeletePropertyAst, PatchPropertyAst, PutPropertyAst, HeadPropertyAst, AllPropertyAst } from 'ims-core';
export declare class MethodVisitor extends NullAstVisitor {
    visitProperty(ast: PropertyAst, context: ParserAstContext): DeletePropertyAst | GetPropertyAst | HeadPropertyAst | PatchPropertyAst | PostPropertyAst | PutPropertyAst | AllPropertyAst;
    visitMethod(ast: MethodAst, context: ParserAstContext): DeleteMethodAst | GetMethodAst | HeadMethodAst | PatchMethodAst | PostMethodAst | PutMethodAst | AllMethodAst;
}
