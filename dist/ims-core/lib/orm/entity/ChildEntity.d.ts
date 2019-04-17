import { ClassContext, ClassAst } from 'ims-decorator';
export interface ChildEntity {
}
export declare const ChildEntityMetadataKey = "ChildEntityMetadataKey";
export declare const ChildEntity: (metadataDef?: ChildEntity & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isChildEntityClassAst(val: ClassAst): val is ClassAst<ChildEntity>;
export declare class ChildEntityAst extends ClassContext<ChildEntity> {
}
