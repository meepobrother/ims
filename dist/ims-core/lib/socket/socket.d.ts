import { ParameterAst, ParserAstContext, ParameterContext, PropertyAst, PropertyContext, MethodAst, MethodContext } from 'ims-decorator';
export declare type SocketOptions = string;
export declare const SocketMetadataKey = "SocketMetadataKey";
export declare const Socket: (metadataDef?: string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isSocketPropertyAst(val: PropertyAst): val is PropertyAst<SocketOptions>;
export declare class SocketPropertyAst extends PropertyContext<SocketOptions> {
    constructor(ast: PropertyAst<SocketOptions>, context: ParserAstContext);
}
export declare function isSocketMethodAst(val: MethodAst): val is MethodAst<SocketOptions>;
export declare class SocketMethodAst extends MethodContext<SocketOptions> {
    name: string;
    constructor(ast: MethodAst<SocketOptions>, context: ParserAstContext);
}
export declare function isSocketParameterAst(val: ParameterAst): val is ParameterAst<SocketOptions>;
export declare class SocketParameterAst extends ParameterContext<SocketOptions> {
    constructor(ast: ParameterAst<SocketOptions>, context: ParserAstContext);
}
