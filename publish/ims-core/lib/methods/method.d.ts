import { MethodContext, MethodAst, ParserAstContext, PropertyContext, PropertyAst } from 'ims-decorator';
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
export declare class HttpPropertyContext<T extends IHttpMethod> extends PropertyContext<T> {
    path: string;
    constructor(ast: PropertyAst<T>, context: ParserAstContext);
}
