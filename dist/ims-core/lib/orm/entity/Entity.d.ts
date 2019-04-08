import { ClassAst, ClassContext } from 'ims-decorator';
import { EntityOptions } from 'typeorm';
export interface Entity extends EntityOptions {
}
export declare const EntityMetadataKey = "EntityMetadataKey";
export declare const Entity: (metadataDef?: Entity & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isEntityClassAst(val: ClassAst): val is ClassAst<Entity>;
export declare class EntityAst extends ClassContext<Entity> {
}
