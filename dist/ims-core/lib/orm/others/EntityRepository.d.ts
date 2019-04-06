import { ClassAst, PropertyContext } from 'ims-decorator';
export interface EntityRepositoryOptions {
    /**
     * 数据库名称
     */
    db?: string;
    /**
     * entity
     */
    target: any;
}
export declare const EntityRepositoryMetadataKey = "EntityRepositoryMetadataKey";
export declare const EntityRepository: (metadataDef?: EntityRepositoryOptions & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isEntityRepositoryPropertyAst(val: ClassAst): val is ClassAst<EntityRepositoryOptions>;
export declare class EntityRepositoryAst extends PropertyContext<EntityRepositoryOptions> {
}
import { Repository } from 'typeorm';
export declare type EntityRepository<T> = Repository<T>;
