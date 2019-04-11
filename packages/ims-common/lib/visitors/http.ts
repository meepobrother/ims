import { NullAstVisitor, ParameterAst, ParserAstContext } from 'ims-decorator';
import {
    isBodyParameterAst, BodyAst,
    isReqParameterAst, ReqAst,
    isQueryParameterAst, QueryAst,
    isRedirectParameterAst, RedirectAst,
    isSessionParameterAst, SessionAst,
    isUploadParameterAst, UploadAst, isResParameterAst,
    ResAst, isNextParameterAst, NextAst, isUploadsParameterAst, UploadsAst, isCookiePropertyAst, CookieParameterAst
} from 'ims-core';

export class HttpVisitor extends NullAstVisitor {
    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        if (isBodyParameterAst(ast)) {
            return new BodyAst(ast, context)
        }
        if (isReqParameterAst(ast)) {
            return new ReqAst(ast, context)
        }
        if (isQueryParameterAst(ast)) {
            return new QueryAst(ast, context)
        }
        if (isRedirectParameterAst(ast)) {
            return new RedirectAst(ast, context)
        }
        if (isSessionParameterAst(ast)) {
            return new SessionAst(ast, context)
        }
        if (isUploadParameterAst(ast)) {
            return new UploadAst(ast, context)
        }
        if (isResParameterAst(ast)) {
            return new ResAst(ast, context)
        }
        if (isNextParameterAst(ast)) {
            return new NextAst(ast, context)
        }
        if (isUploadsParameterAst(ast)) {
            return new UploadsAst(ast, context)
        }
        if (isCookiePropertyAst(ast)) {
            return new CookieParameterAst(ast, context)
        }
    }
}