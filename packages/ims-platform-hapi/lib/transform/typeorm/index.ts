import { TypeContext } from "ims-decorator";
import { ConnectionManager, Connection, getConnectionManager } from 'typeorm'
import { EntityRepositoryAst, EntityRepositoryMetadataKey } from "ims-core";
import { getConfig } from "ims-common";
import { parseTypeorm } from "ims-platform-typeorm";
export function transformTypeorm(
    context: TypeContext
) {
    const config = getConfig();
    const options = getConnectionManager();
    const propertys = context.getProperty(EntityRepositoryMetadataKey) as EntityRepositoryAst[];
    propertys.map(pro => {
        const def = pro.ast.metadataDef;
        let connection: Connection;
        if (def.db === 'addons') {
            connection = options.get(config.addons)
        } else if (def.db === 'system') {
            connection = options.get(config.system)
        }
        parseTypeorm(context);
        context.instance[pro.ast.propertyKey] = connection.getRepository(def.target)
    })
}