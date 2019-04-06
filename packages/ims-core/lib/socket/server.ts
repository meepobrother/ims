import { makeDecorator, PropertyAst, PropertyContext, ParserAstContext } from 'ims-decorator';
export type ServerOptions = string;
export const ServerMetadataKey = 'ServerMetadataKey'
export const Server = makeDecorator<ServerOptions>(ServerMetadataKey);
export function isServerPropertyAst(val: PropertyAst): val is PropertyAst<ServerOptions> {
    return val.metadataKey === ServerMetadataKey;
}
export class ServerAst extends PropertyContext<ServerOptions> {
    constructor(ast: PropertyAst<ServerOptions>, context: ParserAstContext) {
        super(ast, context);
    }

    getValue() {
        this.context.typeContext.get('ws:server')
    }
}

import { Server as WsServer } from 'ws';
export type Server = WsServer;