import { makeDecorator, MethodContext, ParameterAst, ParameterContext, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
/**
 * 群聊
 * 如果用在方法上 subscribe
 * 如果在属性上 势力
 * 如果在参数上 发送
 */
export interface PubsubOptions { };
export const PubsubMetadataKey = 'PubsubMetadataKey'
export const Pubsub = makeDecorator<PubsubOptions>(PubsubMetadataKey);

// 方法
export function isPubsubMethodAst(val: MethodAst): val is MethodAst<PubsubOptions> {
    return val.metadataKey === PubsubMetadataKey;
}
export class PubsubMethodAst extends MethodContext<PubsubOptions> { }
// 属性
export function isPubsubPropertyAst(val: PropertyAst): val is PropertyAst<PubsubOptions> {
    return val.metadataKey === PubsubMetadataKey;
}
export class PubsubPropertyAst extends PropertyContext<PubsubOptions> { }

// 参数
export function isPubsubParameterAst(val: ParameterAst): val is ParameterAst<PubsubOptions> {
    return val.metadataKey === PubsubMetadataKey;
}
export class PubsubParameterAst extends ParameterContext<PubsubOptions> { }
