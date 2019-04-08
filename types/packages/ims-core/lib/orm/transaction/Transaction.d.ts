import { MethodContext, MethodAst } from 'ims-decorator';
export interface Transaction {
}
export declare const TransactionMetadataKey = "TransactionMetadataKey";
export declare const Transaction: (metadataDef?: Transaction & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isTransactionMethodAst(val: MethodAst): val is MethodAst<Transaction>;
export declare class TransactionAst extends MethodContext<Transaction> {
}
