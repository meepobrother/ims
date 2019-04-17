import { PropertyContext, PropertyAst } from 'ims-decorator';
export declare type CheckOptions = string;
export declare const CheckMetadataKey = "CheckMetadataKey";
export declare const Check: (metadataDef?: string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class CheckAst extends PropertyContext<CheckOptions> {
}
export declare function isCheckPropertyAst(val: PropertyAst): val is PropertyAst<CheckOptions>;
