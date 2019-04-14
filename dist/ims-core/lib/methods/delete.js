"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.DeleteMetadataKey = 'DeleteMetadataKey';
const method_1 = require("./method");
exports.Delete = ims_decorator_1.makeDecorator(exports.DeleteMetadataKey);
function isDeleteMethodAst(val) {
    return val.metadataKey === exports.DeleteMetadataKey;
}
exports.isDeleteMethodAst = isDeleteMethodAst;
class DeleteMethodAst extends method_1.HttpMethodContext {
}
exports.DeleteMethodAst = DeleteMethodAst;
function isDeletePropertyAst(val) {
    return val.metadataKey === exports.DeleteMetadataKey;
}
exports.isDeletePropertyAst = isDeletePropertyAst;
class DeletePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.DeletePropertyAst = DeletePropertyAst;
