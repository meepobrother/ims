import { makeDecorator, ClassAst, ClassContext } from 'ims-decorator';
export interface TableInheritance { }
export const TableInheritanceMetadataKey = 'TableInheritanceMetadataKey'
export const TableInheritance = makeDecorator<TableInheritance>(TableInheritanceMetadataKey);
export function isTableInheritanceClassAst(val: ClassAst): val is ClassAst<TableInheritance> {
    return val.metadataKey === TableInheritanceMetadataKey;
}
export class TableInheritanceAst extends ClassContext<TableInheritance>{ }
