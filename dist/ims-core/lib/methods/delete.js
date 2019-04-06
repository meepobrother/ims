"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.DeleteMetadataKey = 'DeleteMetadataKey';
const method_1 = require("./method");
exports.Delete = ims_common_1.makeDecorator(exports.DeleteMetadataKey);
function isDeleteMethodAst(val) {
    return val.metadataKey === exports.DeleteMetadataKey;
}
exports.isDeleteMethodAst = isDeleteMethodAst;
class DeleteAst extends method_1.HttpMethodContext {
}
exports.DeleteAst = DeleteAst;
