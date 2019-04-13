import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
/**
 * 单聊
 */
export type ContentRoutingOptions = string;
export const ContentRoutingMetadataKey = 'ContentRoutingMetadataKey'
export const ContentRouting = makeDecorator<ContentRoutingOptions>(ContentRoutingMetadataKey);
// 属性
export function isContentRoutingPropertyAst(val: PropertyAst): val is PropertyAst<ContentRoutingOptions> {
    return val.metadataKey === ContentRoutingMetadataKey;
}
export class ContentRoutingPropertyAst extends PropertyContext<ContentRoutingOptions> { }
