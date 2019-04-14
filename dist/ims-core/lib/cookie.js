"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.CookieMetadataKey = 'CookieMetadataKey';
exports.Cookie = ims_decorator_1.makeDecorator(exports.CookieMetadataKey);
function isCookieParameterAst(val) {
    return val.metadataKey === exports.CookieMetadataKey;
}
exports.isCookieParameterAst = isCookieParameterAst;
class CookieParameterAst extends ims_decorator_1.ParameterContext {
}
exports.CookieParameterAst = CookieParameterAst;
