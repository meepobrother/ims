"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.StoreMetadataKey = 'StoreMetadataKey';
exports.Store = ims_common_1.makeDecorator(exports.StoreMetadataKey);
class StoreAst extends ims_common_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        if (ast.metadataDef) {
            this.name = ast.metadataDef.name || ast.target.name;
        }
        else {
            this.name = ast.target.name;
        }
    }
}
exports.StoreAst = StoreAst;
function isStoreClassAst(val) {
    return val.metadataKey === exports.StoreMetadataKey;
}
exports.isStoreClassAst = isStoreClassAst;
