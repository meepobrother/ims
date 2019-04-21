"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ims_core_1 = require("ims-core");
const ims_common_1 = require("ims-common");
const ims_platform_typeorm_1 = require("ims-platform-typeorm");
function transformTypeorm(context) {
    const config = ims_common_1.getConfig();
    const options = typeorm_1.getConnectionManager();
    const propertys = context.getProperty(ims_core_1.EntityRepositoryMetadataKey);
    propertys.map(pro => {
        const def = pro.ast.metadataDef;
        let connection;
        if (def.db === 'addons') {
            connection = options.get(config.addons);
        }
        else if (def.db === 'system') {
            connection = options.get(config.system);
        }
        ims_platform_typeorm_1.parseTypeorm(context);
        context.instance[pro.ast.propertyKey] = connection.getRepository(def.target);
    });
}
exports.transformTypeorm = transformTypeorm;
