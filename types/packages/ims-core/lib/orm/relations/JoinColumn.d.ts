import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface JoinColumn {
}
export declare const JoinColumnMetadataKey = "JoinColumnMetadataKey";
export declare const JoinColumn: (metadataDef?: JoinColumn & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isJoinColumnPropertyAst(val: PropertyAst): val is PropertyAst<JoinColumn>;
export declare class JoinColumnAst extends PropertyContext<JoinColumn> {
}
