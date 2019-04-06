import { makeDecorator, ParameterAst, ParserAstContext, ParameterContext } from 'ims-decorator';
export interface SocketOptions { };
export const SocketMetadataKey = 'SocketMetadataKey'
export const Socket = makeDecorator<SocketOptions>(SocketMetadataKey);
export function isSocketParameterAst(val: ParameterAst): val is ParameterAst<SocketOptions> {
    return val.metadataKey === SocketMetadataKey;
}
export class SocketAst extends ParameterContext<SocketOptions> {
    constructor(ast: ParameterAst<SocketOptions>, context: ParserAstContext) {
        super(ast, context);
    }
}
import WebSocket from 'ws';
export type Socket = WebSocket;
