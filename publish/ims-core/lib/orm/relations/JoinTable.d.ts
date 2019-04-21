import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface JoinTable {
}
export declare const JoinTableMetadataKey = "JoinTableMetadataKey";
export declare const JoinTable: (metadataDef?: JoinTable & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isJoinTablePropertyAst(val: PropertyAst): val is PropertyAst<JoinTable>;
export declare class JoinTableAst extends PropertyContext<JoinTable> {
}
