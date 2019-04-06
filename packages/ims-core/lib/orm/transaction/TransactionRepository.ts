import { makeDecorator, ParameterAst, ParameterContext } from 'ims-decorator';
export interface TransactionRepository { }
export const TransactionRepositoryMetadataKey = 'TransactionRepositoryMetadataKey'
export const TransactionRepository = makeDecorator<TransactionRepository>(TransactionRepositoryMetadataKey);
export function isTransactionRepositoryParameterAst(val: ParameterAst): val is ParameterAst<TransactionRepository> {
    return val.metadataKey === TransactionRepositoryMetadataKey;
}
export class TransactionRepositoryAst extends ParameterContext<TransactionRepository>{ }