"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TransactionRepositoryMetadataKey = 'TransactionRepositoryMetadataKey';
exports.TransactionRepository = ims_decorator_1.makeDecorator(exports.TransactionRepositoryMetadataKey);
function isTransactionRepositoryParameterAst(val) {
    return val.metadataKey === exports.TransactionRepositoryMetadataKey;
}
exports.isTransactionRepositoryParameterAst = isTransactionRepositoryParameterAst;
class TransactionRepositoryAst extends ims_decorator_1.ParameterContext {
}
exports.TransactionRepositoryAst = TransactionRepositoryAst;
