"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.OnReadyMetadateKey = 'OnReadyMetadateKey';
exports.OnReady = ims_common_1.makeDecorator(exports.OnReadyMetadateKey);
class OnReadyAst extends ims_common_1.MethodContext {
}
exports.OnReadyAst = OnReadyAst;
