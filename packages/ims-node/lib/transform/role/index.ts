import { TypeContext } from "ims-decorator";
import { TransformOptions } from "../type";
import { RoleMetadataKey, RoleMethodAst, RoleOptions } from "ims-core";

export default function transform(context: TypeContext, options: TransformOptions) {
    const roles = context.getMethod(RoleMetadataKey) as RoleMethodAst[];
    const map: Map<PropertyKey, RoleOptions[]> = new Map();
    roles.map(role => {
        if (!map.has(role.ast.propertyKey)) {
            map.set(role.ast.propertyKey, [])
        }
        map.get(role.ast.propertyKey).push(role.ast.metadataDef)
    })
    context.set('role', map);
}
