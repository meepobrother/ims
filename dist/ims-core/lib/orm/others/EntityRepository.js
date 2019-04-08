"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
var RepositoryType;
(function (RepositoryType) {
    RepositoryType[RepositoryType["system"] = 0] = "system";
    RepositoryType[RepositoryType["addons"] = 1] = "addons";
})(RepositoryType = exports.RepositoryType || (exports.RepositoryType = {}));
;
exports.EntityRepositoryMetadataKey = 'EntityRepositoryMetadataKey';
exports.EntityRepository = ims_decorator_1.makeDecorator(exports.EntityRepositoryMetadataKey, def => {
    let { metadataDef } = def;
    metadataDef = metadataDef || {};
    metadataDef.db = metadataDef.db || RepositoryType.addons;
    return metadataDef;
});
function isEntityRepositoryPropertyAst(val) {
    return val.metadataKey === exports.EntityRepositoryMetadataKey;
}
exports.isEntityRepositoryPropertyAst = isEntityRepositoryPropertyAst;
class EntityRepositoryAst extends ims_decorator_1.PropertyContext {
}
exports.EntityRepositoryAst = EntityRepositoryAst;
