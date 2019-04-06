import { makeDecorator, MethodContext, MethodAst } from 'ims-decorator';
export const ActionMetadataKey = 'ActionMetadataKey'
export interface Action { }
export const Action = makeDecorator<Action>(ActionMetadataKey);
export class ActionAst extends MethodContext<Action> { }
export function isActionMethodAst(val: MethodAst): val is MethodAst<Action> {
    return val.metadataKey === ActionMetadataKey;
}