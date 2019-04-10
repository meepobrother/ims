import { MethodAst, MethodContext, ParserAstContext } from 'ims-decorator';
export declare type On = string;
export declare const OnMetadataKey = "OnMetadataKey";
export declare const On: (metadataDef?: string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isOnMethodAst(val: MethodAst): val is MethodAst<On>;
export declare class OnAst extends MethodContext<On> {
    constructor(ast: MethodAst<On>, context: ParserAstContext);
}
