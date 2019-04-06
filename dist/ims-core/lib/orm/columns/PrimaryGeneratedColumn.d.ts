import { PropertyAst, PropertyContext } from 'ims-decorator';
export interface PrimaryGeneratedColumn {
}
export declare const PrimaryGeneratedColumnMetadataKey = "PrimaryGeneratedColumnMetadataKey";
export declare const PrimaryGeneratedColumn: (metadataDef?: PrimaryGeneratedColumn & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isPrimaryGeneratedColumnPropertyAst(val: PropertyAst): val is PropertyAst<PrimaryGeneratedColumn>;
export declare class PrimaryGeneratedColumnAst extends PropertyContext<PrimaryGeneratedColumn> {
}
