import { PropertyAst, PropertyContext } from 'ims-decorator';
/**
 * 单聊
 */
export declare type ContentRoutingOptions = string;
export declare const ContentRoutingMetadataKey = "ContentRoutingMetadataKey";
export declare const ContentRouting: (metadataDef?: string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isContentRoutingPropertyAst(val: PropertyAst): val is PropertyAst<ContentRoutingOptions>;
export declare class ContentRoutingPropertyAst extends PropertyContext<ContentRoutingOptions> {
}
