import { PropertyAst, PropertyContext } from 'ims-decorator';
export declare type ExclusionOptions = string;
export declare const ExclusionMetadataKey = "ExclusionMetadataKey";
export declare const Exclusion: (metadataDef?: string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class ExclusionAst extends PropertyContext<ExclusionOptions> {
}
export declare function isExclusionPropertyAst(val: PropertyAst): val is PropertyAst<ExclusionOptions>;
