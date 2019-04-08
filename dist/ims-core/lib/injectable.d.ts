import { ClassAst, ClassContext, ParserAstContext } from 'ims-decorator';
export declare const InjectableMetadataKey = "InjectableMetadataKey";
export declare type Injectable = {};
export declare const Injectable: (metadataDef?: {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class InjectableAst extends ClassContext<Injectable> {
    constructor(ast: ClassAst<Injectable>, context: ParserAstContext);
}
export declare function isInjectableClassAst(val: ClassAst): val is ClassAst<Injectable>;
