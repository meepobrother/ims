"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OnReadyMetadateKey = 'OnReadyMetadateKey';
exports.OnReady = ims_decorator_1.makeDecorator(exports.OnReadyMetadateKey);
class OnReadyAst extends ims_decorator_1.MethodContext {
}
exports.OnReadyAst = OnReadyAst;
