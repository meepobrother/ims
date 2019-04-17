"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
class HttpVisitor extends ims_decorator_1.NullAstVisitor {
    visitParameter(ast, context) {
        if (ims_core_1.isBodyParameterAst(ast)) {
            return new ims_core_1.BodyAst(ast, context);
        }
        if (ims_core_1.isReqParameterAst(ast)) {
            return new ims_core_1.ReqAst(ast, context);
        }
        if (ims_core_1.isQueryParameterAst(ast)) {
            return new ims_core_1.QueryAst(ast, context);
        }
        if (ims_core_1.isRedirectParameterAst(ast)) {
            return new ims_core_1.RedirectAst(ast, context);
        }
        if (ims_core_1.isSessionParameterAst(ast)) {
            return new ims_core_1.SessionAst(ast, context);
        }
        if (ims_core_1.isUploadParameterAst(ast)) {
            return new ims_core_1.UploadAst(ast, context);
        }
        if (ims_core_1.isResParameterAst(ast)) {
            return new ims_core_1.ResAst(ast, context);
        }
        if (ims_core_1.isNextParameterAst(ast)) {
            return new ims_core_1.NextAst(ast, context);
        }
        if (ims_core_1.isUploadsParameterAst(ast)) {
            return new ims_core_1.UploadsAst(ast, context);
        }
        if (ims_core_1.isCookieParameterAst(ast)) {
            return new ims_core_1.CookieParameterAst(ast, context);
        }
    }
}
exports.HttpVisitor = HttpVisitor;
