import { NullAstVisitor, ParameterAst, ParserAstContext } from 'ims-decorator';
import { BodyAst, ReqAst, QueryAst, RedirectAst, SessionAst, UploadAst, ResAst, NextAst, UploadsAst } from 'ims-core';
export declare class HttpVisitor extends NullAstVisitor {
    visitParameter(ast: ParameterAst, context: ParserAstContext): BodyAst | NextAst | QueryAst | RedirectAst | ReqAst | ResAst | SessionAst | UploadAst | UploadsAst;
}
