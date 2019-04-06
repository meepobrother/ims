import { MethodContext, MethodAst } from 'ims-common';
export declare const ActionMetadataKey = "ActionMetadataKey";
export interface Action {
}
export declare const Action: (metadataDef?: Action & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare class ActionAst extends MethodContext<Action> {
}
export declare function isActionMethodAst(val: MethodAst): val is MethodAst<Action>;
