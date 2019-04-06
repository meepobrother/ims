import { PropertyContext, PropertyAst } from 'ims-decorator';
export interface BeforeUpdate {
}
export declare const BeforeUpdateMetadataKey = "BeforeUpdateMetadataKey";
export declare const BeforeUpdate: (metadataDef?: BeforeUpdate & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare class BeforeUpdateAst extends PropertyContext<BeforeUpdate> {
}
export declare function isBeforeUpdatePropertyAst(val: PropertyAst): val is PropertyAst<BeforeUpdate>;
