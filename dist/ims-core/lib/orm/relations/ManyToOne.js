"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ManyToOneMetadataKey = 'ManyToOneMetadataKey';
const factory = ims_decorator_1.makeDecorator(exports.ManyToOneMetadataKey);
exports.ManyToOne = (typeFunction, inverseSide, options) => {
    const opt = {
        typeFunction,
        inverseSide,
        options
    };
    return factory(opt);
};
function isManyToOnePropertyAst(val) {
    return val.metadataKey === exports.ManyToOneMetadataKey;
}
exports.isManyToOnePropertyAst = isManyToOnePropertyAst;
class ManyToOneAst extends ims_decorator_1.PropertyContext {
}
exports.ManyToOneAst = ManyToOneAst;
