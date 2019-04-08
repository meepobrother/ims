import { ClassAst, ClassContext } from 'ims-decorator';
export interface TableInheritance {
}
export declare const TableInheritanceMetadataKey = "TableInheritanceMetadataKey";
export declare const TableInheritance: (metadataDef?: TableInheritance & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isTableInheritanceClassAst(val: ClassAst): val is ClassAst<TableInheritance>;
export declare class TableInheritanceAst extends ClassContext<TableInheritance> {
}
