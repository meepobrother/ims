"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OutputMetadataKey = 'OutputMetadataKey';
exports.Output = ims_decorator_1.makeDecorator(exports.OutputMetadataKey);
class OutputAst extends ims_decorator_1.PropertyContext {
}
exports.OutputAst = OutputAst;