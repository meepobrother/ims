import { PropertyContext, PropertyAst } from 'ims-decorator';
export declare type GeneratedOptions = "increment" | "uuid" | "rowid";
export declare const GeneratedMetadataKey = "GeneratedMetadataKey";
export declare const Generated: (metadataDef?: ("increment" & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) | ("uuid" & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) | ("rowid" & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
})) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class GeneratedAst extends PropertyContext<GeneratedOptions> {
}
export declare function isGeneratedPropertyAst(val: PropertyAst): val is PropertyAst<GeneratedOptions>;
