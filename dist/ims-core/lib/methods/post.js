"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const method_1 = require("./method");
exports.PostMetadataKey = 'PostMetadataKey';
;
exports.Post = ims_decorator_1.makeDecorator(exports.PostMetadataKey);
function isPostMethodAst(val) {
    return val.metadataKey === exports.PostMetadataKey;
}
exports.isPostMethodAst = isPostMethodAst;
class PostMethodAst extends method_1.HttpMethodContext {
}
exports.PostMethodAst = PostMethodAst;
function isPostPropertyAst(val) {
    return val.metadataKey === exports.PostMetadataKey;
}
exports.isPostPropertyAst = isPostPropertyAst;
class PostPropertyAst extends ims_decorator_1.PropertyContext {
}
exports.PostPropertyAst = PostPropertyAst;
