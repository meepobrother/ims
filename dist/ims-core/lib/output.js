"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.OutputMetadataKey = 'OutputMetadataKey';
exports.Output = ims_common_1.makeDecorator(exports.OutputMetadataKey);
class OutputAst extends ims_common_1.PropertyContext {
}
exports.OutputAst = OutputAst;
