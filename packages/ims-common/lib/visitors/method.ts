import { NullAstVisitor, MethodAst, ParserAstContext } from 'ims-decorator';
import {
    isGetMethodAst, GetAst, isPostMethodAst, PostAst,
    isDeleteMethodAst, DeleteAst, isPutMethodAst, PutAst,
    isOptionMethodAst, OptionAst, isHeadMethodAst, HeadAst,
    isPatchMethodAst, PatchAst
} from 'ims-core';

export class MethodVisitor extends NullAstVisitor {
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        if (isGetMethodAst(ast)) {
            return new GetAst(ast, context);
        }
        if (isPostMethodAst(ast)) {
            return new PostAst(ast, context);
        }
        if (isDeleteMethodAst(ast)) {
            return new DeleteAst(ast, context);
        }
        if (isPutMethodAst(ast)) {
            return new PutAst(ast, context);
        }
        if (isOptionMethodAst(ast)) {
            return new OptionAst(ast, context);
        }
        if (isHeadMethodAst(ast)) {
            return new HeadAst(ast, context);
        }
        if (isPatchMethodAst(ast)) {
            return new PatchAst(ast, context);
        }
    }
}