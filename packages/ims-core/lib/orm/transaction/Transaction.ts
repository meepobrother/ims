import { makeDecorator, MethodContext, MethodAst } from 'ims-decorator';
export interface Transaction { }
export const TransactionMetadataKey = 'TransactionMetadataKey'
export const Transaction = makeDecorator<Transaction>(TransactionMetadataKey);
export function isTransactionMethodAst(val: MethodAst): val is MethodAst<Transaction> {
    return val.metadataKey === TransactionMetadataKey;
}
export class TransactionAst extends MethodContext<Transaction>{ }