import { MethodContext, MethodAst, ParserAstContext } from 'ims-common';
export interface IHttpMethod {
    path?: string;
}
export declare class HttpMethodContext<T extends IHttpMethod> extends MethodContext<T> {
    path: string;
    constructor(ast: MethodAst<T>, context: ParserAstContext);
}
