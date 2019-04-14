"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OneToOneMetadataKey = 'OneToOneMetadataKey';
const factory = ims_decorator_1.makeDecorator(exports.OneToOneMetadataKey);
exports.OneToOne = (typeFunction, inverseSide, options) => {
    const opt = {
        typeFunction,
        inverseSide,
        options
    };
    return factory(opt);
};
function isOneToOnePropertyAst(val) {
    return val.metadataKey === exports.OneToOneMetadataKey;
}
exports.isOneToOnePropertyAst = isOneToOnePropertyAst;
class OneToOneAst extends ims_decorator_1.PropertyContext {
}
exports.OneToOneAst = OneToOneAst;
