import { MethodContext, MethodAst, ParserAstContext } from 'ims-decorator';
export interface IHttpMethod {
    /** 路径 */
    path?: string;
    /** 名字 */
    name?: string;
    /** 简介 */
    desc?: string;
    /** 权限 */
    roles?: string[];
}
export declare class HttpMethodContext<T extends IHttpMethod> extends MethodContext<T> {
    path: string;
    constructor(ast: MethodAst<T>, context: ParserAstContext);
}
