import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface BeforeRemove {
}
export declare const BeforeRemoveMetadataKey = "BeforeRemoveMetadataKey";
export declare const BeforeRemove: (metadataDef?: BeforeRemove & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare class BeforeRemoveAst extends PropertyContext<BeforeRemove> {
}
export declare function isBeforeRemovePropertyAst(val: PropertyAst): val is PropertyAst<BeforeRemove>;
