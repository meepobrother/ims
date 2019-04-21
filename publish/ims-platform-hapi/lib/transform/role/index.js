"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const typeorm_1 = require("../typeorm");
function transformRole(context) {
    const addonAst = context.getClass(ims_core_1.AddonMetadataKey);
    addonAst.incs.map(inc => {
        typeorm_1.transformTypeorm(inc);
        const methods = inc.getMethod();
        methods.map((par) => {
            if (par instanceof ims_core_1.RoleMethodAst) {
                inc.set(par.ast.propertyKey, par.ast.metadataDef);
            }
        });
    });
}
exports.transformRole = transformRole;
