import { makeDecorator, ClassAst, PropertyContext } from 'ims-decorator';
export interface EntityRepositoryOptions {
    /**
     * 数据库名称
     */
    db?: 'system' | 'addons';
    /**
     * entity
     */
    target: any;
};
export const EntityRepositoryMetadataKey = 'EntityRepositoryMetadataKey'
export const EntityRepository = makeDecorator<EntityRepositoryOptions>(EntityRepositoryMetadataKey, def => {
    let { metadataDef } = def;
    metadataDef = metadataDef || {} as EntityRepositoryOptions;
    metadataDef.db = metadataDef.db || 'addons';
    return metadataDef;
});
export function isEntityRepositoryPropertyAst(val: ClassAst): val is ClassAst<EntityRepositoryOptions> {
    return val.metadataKey === EntityRepositoryMetadataKey;
}
export class EntityRepositoryAst extends PropertyContext<EntityRepositoryOptions> { }
import { Repository } from 'typeorm';
export type EntityRepository<T> = Repository<T>;