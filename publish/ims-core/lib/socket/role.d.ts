import { MethodContext, ParameterAst, ParameterContext, MethodAst, PropertyAst, PropertyContext } from 'ims-decorator';
/**
 * 权限
 */
export interface Handler {
    (user: any): boolean;
}
export declare type RoleOptions = string | string[] | Handler;
export declare const RoleMetadataKey = "RoleMetadataKey";
export declare const Role: (metadataDef?: (string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) | (string[] & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) | (Handler & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
})) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isRoleMethodAst(val: MethodAst): val is MethodAst<RoleOptions>;
export declare class RoleMethodAst extends MethodContext<RoleOptions> {
}
export declare function isRolePropertyAst(val: PropertyAst): val is PropertyAst<RoleOptions>;
export declare class RolePropertyAst extends PropertyContext<RoleOptions> {
}
export declare function isRoleParameterAst(val: ParameterAst): val is ParameterAst<RoleOptions>;
export declare class RoleParameterAst extends ParameterContext<RoleOptions> {
}
export interface RoleParameter {
    id: number;
    username: string;
    role: string;
}
