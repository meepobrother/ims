import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface AfterLoad {
}
export declare const AfterLoadMetadataKey = "AfterLoadMetadataKey";
export declare const AfterLoad: (metadataDef?: AfterLoad & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare class AfterLoadAst extends PropertyContext<AfterLoad> {
}
export declare function isAfterLoadPropertyAst(val: PropertyAst): val is PropertyAst<AfterLoad>;
