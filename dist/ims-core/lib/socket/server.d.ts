import { PropertyAst, PropertyContext, ParserAstContext } from 'ims-decorator';
export declare type ServerOptions = string;
export declare const ServerMetadataKey = "ServerMetadataKey";
export declare const Server: (metadataDef?: string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isServerPropertyAst(val: PropertyAst): val is PropertyAst<ServerOptions>;
export declare class ServerAst extends PropertyContext<ServerOptions> {
    constructor(ast: PropertyAst<ServerOptions>, context: ParserAstContext);
    getValue(): void;
}
import { Server as WsServer } from 'ws';
export declare type Server = WsServer;
