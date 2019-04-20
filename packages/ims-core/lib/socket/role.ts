import { makeDecorator, MethodContext, ParameterAst, ParameterContext, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
/**
 * 权限
 */
export interface Handler {
    (user: any): boolean
}
export type RoleOptions = string | string[] | Handler;
export const RoleMetadataKey = 'RoleMetadataKey'
export const Role = makeDecorator<RoleOptions>(RoleMetadataKey);

// 判断是否有权限访问某个函数
export function isRoleMethodAst(val: MethodAst): val is MethodAst<RoleOptions> {
    return val.metadataKey === RoleMetadataKey;
}
export class RoleMethodAst extends MethodContext<RoleOptions> { }
// 控制是否有权限访问某个字段 用在Entity
export function isRolePropertyAst(val: PropertyAst): val is PropertyAst<RoleOptions> {
    return val.metadataKey === RoleMetadataKey;
}
export class RolePropertyAst extends PropertyContext<RoleOptions> { }
// 动态判断是否拥有权限
export function isRoleParameterAst(val: ParameterAst): val is ParameterAst<RoleOptions> {
    return val.metadataKey === RoleMetadataKey;
}
export class RoleParameterAst extends ParameterContext<RoleOptions> { }

export interface RoleParameter {
    id: number;
    username: string;
    role: string;
}