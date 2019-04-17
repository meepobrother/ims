"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AfterLoadMetadataKey = 'AfterLoadMetadataKey';
exports.AfterLoad = ims_decorator_1.makeDecorator(exports.AfterLoadMetadataKey);
class AfterLoadAst extends ims_decorator_1.PropertyContext {
}
exports.AfterLoadAst = AfterLoadAst;
function isAfterLoadPropertyAst(val) {
    return val.metadataKey === exports.AfterLoadMetadataKey;
}
exports.isAfterLoadPropertyAst = isAfterLoadPropertyAst;
