import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface AfterUpdate {
}
export declare const AfterUpdateMetadataKey = "AfterUpdateMetadataKey";
export declare const AfterUpdate: (metadataDef?: AfterUpdate & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare class AfterUpdateAst extends PropertyContext<AfterUpdate> {
}
export declare function isAfterUpdatePropertyAst(val: PropertyAst): val is PropertyAst<AfterUpdate>;
