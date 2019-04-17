import { ParameterAst, ParameterContext } from 'ims-decorator';
export interface TransactionRepository {
}
export declare const TransactionRepositoryMetadataKey = "TransactionRepositoryMetadataKey";
export declare const TransactionRepository: (metadataDef?: TransactionRepository & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isTransactionRepositoryParameterAst(val: ParameterAst): val is ParameterAst<TransactionRepository>;
export declare class TransactionRepositoryAst extends ParameterContext<TransactionRepository> {
}
