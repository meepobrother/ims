"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.CheckMetadataKey = 'CheckMetadataKey';
exports.Check = ims_decorator_1.makeDecorator(exports.CheckMetadataKey);
class CheckAst extends ims_decorator_1.PropertyContext {
}
exports.CheckAst = CheckAst;
function isCheckPropertyAst(val) {
    return val.metadataKey === exports.CheckMetadataKey;
}
exports.isCheckPropertyAst = isCheckPropertyAst;
