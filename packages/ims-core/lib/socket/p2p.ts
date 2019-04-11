import {
    makeDecorator, MethodAst, MethodContext,
    ParserAstContext, ParameterAst, ParameterContext,
    PropertyContext, PropertyAst
} from 'ims-decorator';
export interface P2pOptions { };
export const P2pMetadataKey = 'P2pMetadataKey'
export const P2p = makeDecorator<P2pOptions>(P2pMetadataKey);
export function isP2pMethodAst(val: MethodAst): val is MethodAst<P2pOptions> {
    return val.metadataKey === P2pMetadataKey;
}
export class P2pAst extends MethodContext<P2pOptions> {
    constructor(ast: MethodAst<P2pOptions>, context: ParserAstContext) {
        super(ast, context);
    }
}
export function isP2pParameterAst(val: ParameterAst): val is ParameterAst<P2pOptions> {
    return val.metadataKey === P2pMetadataKey;
}
export class P2pParameterAst extends ParameterContext<P2pOptions> {
    constructor(ast: ParameterAst<P2pOptions>, context: ParserAstContext) {
        super(ast, context);
    }
}
export function isP2pPrototypeAst(val: PropertyAst): val is PropertyAst<P2pOptions> {
    return val.metadataKey === P2pMetadataKey;
}
export class P2pPropertyAst extends PropertyContext<P2pOptions> { }

export interface P2p {
    topic: string;
    data: object;
}

export interface P2pMessage {
    from: string,
    seqno: Buffer,
    data: Buffer,
    topicIDs: Array<string>
}

import Libp2p from 'libp2p';
export interface P2pProperty extends Libp2p { }
export interface P2pParameter {
    /**
     * 回复
     */
    reply(protocol: string, data: Buffer): any;
    /**
     * 广播
     */
    broadcast(): any;
}
export { Libp2p }
