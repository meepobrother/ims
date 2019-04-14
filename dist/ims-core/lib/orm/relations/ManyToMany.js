"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ManyToManyMetadataKey = 'ManyToManyMetadataKey';
exports.ManyToMany = ims_decorator_1.makeDecorator(exports.ManyToManyMetadataKey);
function isManyToManyPropertyAst(val) {
    return val.metadataKey === exports.ManyToManyMetadataKey;
}
exports.isManyToManyPropertyAst = isManyToManyPropertyAst;
class ManyToManyAst extends ims_decorator_1.PropertyContext {
}
exports.ManyToManyAst = ManyToManyAst;
