import { ParameterAst, ParameterContext } from 'ims-decorator';
export interface TransactionManager {
}
export declare const TransactionManagerMetadataKey = "TransactionManagerMetadataKey";
export declare const TransactionManager: (metadataDef?: TransactionManager & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isTransactionManagerParameterAst(val: ParameterAst): val is ParameterAst<TransactionManager>;
export declare class TransactionManagerAst extends ParameterContext<TransactionManager> {
}
