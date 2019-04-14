"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
function transform(context, options) {
    const roles = context.getMethod(ims_core_1.RoleMetadataKey);
    const map = new Map();
    roles.map(role => {
        if (!map.has(role.ast.propertyKey)) {
            map.set(role.ast.propertyKey, []);
        }
        map.get(role.ast.propertyKey).push(role.ast.metadataDef);
    });
    context.set('role', map);
}
exports.default = transform;
