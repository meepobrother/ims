"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
;
exports.P2pMetadataKey = 'P2pMetadataKey';
exports.P2p = ims_decorator_1.makeDecorator(exports.P2pMetadataKey);
function isP2pPrototypeAst(val) {
    return val.metadataKey === exports.P2pMetadataKey;
}
exports.isP2pPrototypeAst = isP2pPrototypeAst;
class P2pPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.P2pPropertyAst = P2pPropertyAst;
