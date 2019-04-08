import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface ManyToMany {
    typeFunction: (type?: any) => any;
    options: any;
}
export declare const ManyToManyMetadataKey = "ManyToManyMetadataKey";
export declare const ManyToMany: (metadataDef?: ManyToMany & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isManyToManyPropertyAst(val: PropertyAst): val is PropertyAst<ManyToMany>;
export declare class ManyToManyAst extends PropertyContext<ManyToMany> {
}
