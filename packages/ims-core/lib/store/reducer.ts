import { makeDecorator, MethodContext, MethodAst } from 'ims-decorator';
export const ReducerMetadataKey = 'ReducerMetadataKey'
export interface Reducer { }
export const Reducer = makeDecorator<Reducer>(ReducerMetadataKey);
export class ReducerAst extends MethodContext<Reducer> { }
export function isReducerMethodAst(val: MethodAst): val is MethodAst<Reducer> {
    return val.metadataKey === ReducerMetadataKey;
}