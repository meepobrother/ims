"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.P2pMetadataKey = 'P2pMetadataKey';
exports.P2p = ims_decorator_1.makeDecorator(exports.P2pMetadataKey);
function isP2pMethodAst(val) {
    return val.metadataKey === exports.P2pMetadataKey;
}
exports.isP2pMethodAst = isP2pMethodAst;
class P2pAst extends ims_decorator_1.MethodContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.P2pAst = P2pAst;
function isP2pParameterAst(val) {
    return val.metadataKey === exports.P2pMetadataKey;
}
exports.isP2pParameterAst = isP2pParameterAst;
class P2pParameterAst extends ims_decorator_1.ParameterContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.P2pParameterAst = P2pParameterAst;
const libp2p_1 = __importDefault(require("libp2p"));
exports.Libp2p = libp2p_1.default;
