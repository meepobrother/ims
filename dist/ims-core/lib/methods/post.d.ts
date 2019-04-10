import { MethodAst } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod } from './method';
export declare const PostMetadataKey = "PostMetadataKey";
export interface Post extends IHttpMethod {
}
export declare const Post: (metadataDef?: Post & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isPostMethodAst(val: MethodAst): val is MethodAst<Post>;
export declare class PostAst extends HttpMethodContext<Post> {
}
