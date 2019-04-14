import { MethodContext, PropertyAst, PropertyContext, ParameterAst, ParameterContext, MethodAst, ParserAstContext } from 'ims-decorator';
/**
 * 单聊
 */
export declare type ProtocolOptions = string;
export declare const ProtocolMetadataKey = "ProtocolMetadataKey";
export declare const Protocol: (metadataDef?: string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isProtocolPropertyAst(val: PropertyAst): val is PropertyAst<ProtocolOptions>;
export declare class ProtocolPropertyAst extends PropertyContext<ProtocolOptions> {
}
export declare function isProtocolMethodAst(val: MethodAst): val is MethodAst<ProtocolOptions>;
export declare class ProtocolMethodAst extends MethodContext<ProtocolOptions> {
    name: string;
    constructor(ast: MethodAst<ProtocolOptions>, context: ParserAstContext);
}
export declare function isProtocolParameterAst(val: ParameterAst): val is ParameterAst<ProtocolOptions>;
export declare class ProtocolParameterAst extends ParameterContext<ProtocolOptions> {
}
