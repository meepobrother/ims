"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ContentRoutingMetadataKey = 'ContentRoutingMetadataKey';
exports.ContentRouting = ims_decorator_1.makeDecorator(exports.ContentRoutingMetadataKey);
// 属性
function isContentRoutingPropertyAst(val) {
    return val.metadataKey === exports.ContentRoutingMetadataKey;
}
exports.isContentRoutingPropertyAst = isContentRoutingPropertyAst;
class ContentRoutingPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.ContentRoutingPropertyAst = ContentRoutingPropertyAst;
