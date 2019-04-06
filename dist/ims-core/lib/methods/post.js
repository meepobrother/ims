"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
const method_1 = require("./method");
exports.PostMetadataKey = 'PostMetadataKey';
;
exports.Post = ims_common_1.makeDecorator(exports.PostMetadataKey);
function isPostMethodAst(val) {
    return val.metadataKey === exports.PostMetadataKey;
}
exports.isPostMethodAst = isPostMethodAst;
class PostAst extends method_1.HttpMethodContext {
}
exports.PostAst = PostAst;
