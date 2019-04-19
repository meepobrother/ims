import { TypeContext } from "ims-decorator";
import { ConnectionManager, Connection } from 'typeorm'
import { EntityRepositoryAst, EntityRepositoryMetadataKey } from "ims-core";
import { getConfig } from "ims-common";
export function transformTypeorm(
    context: TypeContext,
    options: ConnectionManager
) {
    const config = getConfig();
    const propertys = context.getProperty(EntityRepositoryMetadataKey) as EntityRepositoryAst[];
    propertys.map(pro => {
        const def = pro.ast.metadataDef;
        let connection: Connection;
        if (def.db === 'addons') {
            connection = options.get(config.addons)
        } else if (def.db === 'system') {
            connection = options.get(config.system)
        }
        context.instance[pro.ast.propertyKey] = connection.getRepository(def.target)
    })
}