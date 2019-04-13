import { makeDecorator, MethodContext, ParameterAst, ParserAstContext, ParameterContext, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
/**
 * 群聊
 * 如果用在方法上 subscribe
 * 如果在属性上 势力
 * 如果在参数上 发送
 */
export type PubsubOptions = string;
export const PubsubMetadataKey = 'PubsubMetadataKey'
export const Pubsub = makeDecorator<PubsubOptions>(PubsubMetadataKey);

// 方法
export function isPubsubMethodAst(val: MethodAst): val is MethodAst<PubsubOptions> {
    return val.metadataKey === PubsubMetadataKey;
}
export class PubsubMethodAst extends MethodContext<PubsubOptions> {
    name: string;
    constructor(ast: MethodAst<PubsubOptions>, context: ParserAstContext) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.name = def || ast.propertyKey as string;
    }
}
// 属性
export function isPubsubPropertyAst(val: PropertyAst): val is PropertyAst<PubsubOptions> {
    return val.metadataKey === PubsubMetadataKey;
}
export class PubsubPropertyAst extends PropertyContext<PubsubOptions> { }
