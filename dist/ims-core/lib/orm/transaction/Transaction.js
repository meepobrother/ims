"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TransactionMetadataKey = 'TransactionMetadataKey';
exports.Transaction = ims_decorator_1.makeDecorator(exports.TransactionMetadataKey);
function isTransactionMethodAst(val) {
    return val.metadataKey === exports.TransactionMetadataKey;
}
exports.isTransactionMethodAst = isTransactionMethodAst;
class TransactionAst extends ims_decorator_1.MethodContext {
}
exports.TransactionAst = TransactionAst;
