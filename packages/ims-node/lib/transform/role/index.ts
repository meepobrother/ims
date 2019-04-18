import { TypeContext } from "ims-decorator";
import { TransformOptions } from "../type";
import { RoleMetadataKey, RoleMethodAst, RoleOptions } from "ims-core";
import { verify } from '../../jwt'
export default function transform(context: TypeContext, options: TransformOptions) {
    const roles = context.getMethod(RoleMetadataKey) as RoleMethodAst[];
    const map: Map<PropertyKey, RoleOptions[]> = new Map();
    roles.map(role => {
        if (!map.has(role.ast.propertyKey)) {
            map.set(role.ast.propertyKey, [])
        }
        const def = role.ast.metadataDef;
        if (typeof def === 'function') {
            map.get(role.ast.propertyKey).push(def)
        } else if (typeof def === 'string') {
            map.get(role.ast.propertyKey).push(verify((user: any) => user.role === def))
        } else if (Array.isArray(def)) {
            map.get(role.ast.propertyKey).push(verify((user: any) => def.includes(user.role)))
        }
    })
    context.set('role', map);
}
