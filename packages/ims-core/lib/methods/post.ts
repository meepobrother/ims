import { makeDecorator, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
import { HttpMethodContext, IHttpMethod, HttpPropertyContext } from './method';
export const PostMetadataKey = 'PostMetadataKey';
export interface Post extends IHttpMethod { };
export const Post = makeDecorator<Post>(PostMetadataKey);
export function isPostMethodAst(val: MethodAst): val is MethodAst<Post> {
    return val.metadataKey === PostMetadataKey;
}
export class PostMethodAst extends HttpMethodContext<Post> { }

export function isPostPropertyAst(val: PropertyAst): val is PropertyAst<Post> {
    return val.metadataKey === PostMetadataKey;
}
export class PostPropertyAst extends HttpPropertyContext<Post> { }
export interface PostProperty<T extends Array<any>, R> {
    (...data: T): R
}