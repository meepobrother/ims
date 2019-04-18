import { NullAstVisitor, MethodAst, ParserAstContext, PropertyAst } from 'ims-decorator';
import {
    isGetMethodAst, isPostMethodAst,
    isDeleteMethodAst, isPutMethodAst,
    isHeadMethodAst,
    isPatchMethodAst,
    GetMethodAst,
    PostMethodAst,
    DeleteMethodAst,
    PutMethodAst,
    HeadMethodAst,
    PatchMethodAst,
    isGetPropertyAst,
    GetPropertyAst,
    isPostPropertyAst,
    PostPropertyAst,
    isDeletePropertyAst,
    DeletePropertyAst,
    isPatchPropertyAst,
    PatchPropertyAst,
    isPutPropertyAst,
    PutPropertyAst,
    isHeadPropertyAst,
    HeadPropertyAst,
} from 'ims-core';

export class MethodVisitor extends NullAstVisitor {
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        if (isGetPropertyAst(ast)) {
            return new GetPropertyAst(ast, context)
        }
        if (isPostPropertyAst(ast)) {
            return new PostPropertyAst(ast, context)
        }
        if (isDeletePropertyAst(ast)) {
            return new DeletePropertyAst(ast, context)
        }

        if (isPatchPropertyAst(ast)) {
            return new PatchPropertyAst(ast, context)
        }
        if (isPutPropertyAst(ast)) {
            return new PutPropertyAst(ast, context)
        }
        if (isHeadPropertyAst(ast)) {
            return new HeadPropertyAst(ast, context)
        }
    }
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        if (isGetMethodAst(ast)) {
            return new GetMethodAst(ast, context);
        }
        if (isPostMethodAst(ast)) {
            return new PostMethodAst(ast, context);
        }
        if (isDeleteMethodAst(ast)) {
            return new DeleteMethodAst(ast, context);
        }

        if (isPutMethodAst(ast)) {
            return new PutMethodAst(ast, context);
        }
        if (isHeadMethodAst(ast)) {
            return new HeadMethodAst(ast, context);
        }
        if (isPatchMethodAst(ast)) {
            return new PatchMethodAst(ast, context);
        }
    }
}