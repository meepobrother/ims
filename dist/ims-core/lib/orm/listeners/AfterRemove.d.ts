import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface AfterRemove {
}
export declare const AfterRemoveMetadataKey = "AfterRemoveMetadataKey";
export declare const AfterRemove: (metadataDef?: AfterRemove & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class AfterRemoveAst extends PropertyContext<AfterRemove> {
}
export declare function isAfterRemovePropertyAst(val: PropertyAst): val is PropertyAst<AfterRemove>;
