import { MethodContext, ParserAstContext, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
/**
 * 群聊
 * 如果用在方法上 subscribe
 * 如果在属性上 势力
 * 如果在参数上 发送
 */
export declare type PubsubOptions = string;
export declare const PubsubMetadataKey = "PubsubMetadataKey";
export declare const Pubsub: (metadataDef?: string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isPubsubMethodAst(val: MethodAst): val is MethodAst<PubsubOptions>;
export declare class PubsubMethodAst extends MethodContext<PubsubOptions> {
    name: string;
    constructor(ast: MethodAst<PubsubOptions>, context: ParserAstContext);
}
export declare function isPubsubPropertyAst(val: PropertyAst): val is PropertyAst<PubsubOptions>;
export declare class PubsubPropertyAst extends PropertyContext<PubsubOptions> {
}
