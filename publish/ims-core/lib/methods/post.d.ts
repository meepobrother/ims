import { MethodAst, PropertyAst } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod, HttpPropertyContext } from './method';
export declare const PostMetadataKey = "PostMetadataKey";
export interface Post extends IHttpMethod {
}
export declare const Post: (metadataDef?: Post & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isPostMethodAst(val: MethodAst): val is MethodAst<Post>;
export declare class PostMethodAst extends HttpMethodContext<Post> {
}
export declare function isPostPropertyAst(val: PropertyAst): val is PropertyAst<Post>;
export declare class PostPropertyAst extends HttpPropertyContext<Post> {
}
export interface PostProperty<T extends Array<any>, R> {
    (...data: T): R;
}
