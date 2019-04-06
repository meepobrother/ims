import { makeDecorator, ClassAst, ClassContext } from 'ims-decorator';
export type TreeOptions = "adjacency-list" | "closure-table" | "nested-set" | "materialized-path"
export const TreeMetadataKey = 'TreeMetadataKey'
export const Tree = makeDecorator<TreeOptions>(TreeMetadataKey);
export function isTreeClassAst(val: ClassAst): val is ClassAst<TreeOptions> {
    return val.metadataKey === TreeMetadataKey;
}
export class TreeAst extends ClassContext<TreeOptions>{ }
