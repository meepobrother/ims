import { makeDecorator, MethodContext, PropertyAst, PropertyContext, ParameterAst, ParameterContext, MethodAst, ParserAstContext } from 'ims-decorator';
/**
 * 单聊
 */
export type ProtocolOptions = string;
export const ProtocolMetadataKey = 'ProtocolMetadataKey'
export const Protocol = makeDecorator<ProtocolOptions>(ProtocolMetadataKey);
// 属性
export function isProtocolPropertyAst(val: PropertyAst): val is PropertyAst<ProtocolOptions> {
    return val.metadataKey === ProtocolMetadataKey;
}
export class ProtocolPropertyAst extends PropertyContext<ProtocolOptions> { }
// 方法
export function isProtocolMethodAst(val: MethodAst): val is MethodAst<ProtocolOptions> {
    return val.metadataKey === ProtocolMetadataKey;
}
export class ProtocolMethodAst extends MethodContext<ProtocolOptions> {
    name: string;
    constructor(ast: MethodAst<ProtocolOptions>, context: ParserAstContext) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.name = def || ast.propertyKey as string;
    }
}
// 参数
export function isProtocolParameterAst(val: ParameterAst): val is ParameterAst<ProtocolOptions> {
    return val.metadataKey === ProtocolMetadataKey;
}
export class ProtocolParameterAst extends ParameterContext<ProtocolOptions> { }
import PeerInfo from 'peer-info';
export interface ProtocolParameter {
    // 发送消息
    (peerInfo: PeerInfo, protocol: string, msg: string): any;
}
/**
 * demo
 * @Controller()
 * export class ImsDemo{
 * // 广播
 *  @Pubsub()
 *  pubsubMesg(@Protocol('path') protocol: ProtocolParameter,@Body() msg: ImsMessage){
 *      protocol(peerInfo)
 * }
 *
 *  // 处理消息 handler
 *  @Protocol()
 *  handlerMsg(@Protocol() protocol: ProtocolParameter,@Body() msg: ImsMessage){
 *
 *  }
 * }
 */