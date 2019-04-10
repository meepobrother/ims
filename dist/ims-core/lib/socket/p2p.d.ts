/// <reference types="node" />
import { MethodAst, MethodContext, ParserAstContext, ParameterAst, ParameterContext } from 'ims-decorator';
export declare type P2pOptions = string;
export declare const P2pMetadataKey = "P2pMetadataKey";
export declare const P2p: (metadataDef?: string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isP2pMethodAst(val: MethodAst): val is MethodAst<P2pOptions>;
export declare class P2pAst extends MethodContext<P2pOptions> {
    constructor(ast: MethodAst<P2pOptions>, context: ParserAstContext);
}
export declare function isP2pParameterAst(val: ParameterAst): val is ParameterAst<P2pOptions>;
export declare class P2pParameterAst extends ParameterContext<P2pOptions> {
    constructor(ast: ParameterAst<P2pOptions>, context: ParserAstContext);
}
export interface P2p {
    topic: string;
    data: object;
}
export interface P2pMessage {
    from: string;
    seqno: Buffer;
    data: Buffer;
    topicIDs: Array<string>;
}
import Libp2p from 'libp2p';
export { Libp2p };
