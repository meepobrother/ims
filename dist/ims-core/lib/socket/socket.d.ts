import { ParameterAst, ParserAstContext, ParameterContext } from 'ims-decorator';
export interface SocketOptions {
}
export declare const SocketMetadataKey = "SocketMetadataKey";
export declare const Socket: (metadataDef?: SocketOptions & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isSocketParameterAst(val: ParameterAst): val is ParameterAst<SocketOptions>;
export declare class SocketAst extends ParameterContext<SocketOptions> {
    constructor(ast: ParameterAst<SocketOptions>, context: ParserAstContext);
}
import WebSocket from 'ws';
export declare type Socket = WebSocket;
