import { MethodContext, MethodAst } from 'ims-decorator';
export declare const ActionMetadataKey = "ActionMetadataKey";
export interface Action {
}
export declare const Action: (metadataDef?: Action & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class ActionAst extends MethodContext<Action> {
}
export declare function isActionMethodAst(val: MethodAst): val is MethodAst<Action>;
