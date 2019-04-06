"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_common_1 = require("ims-common");
exports.MigrationMetadataKey = 'MigrationMetadataKey';
exports.Migration = ims_common_1.makeDecorator(exports.MigrationMetadataKey);
function isMigrationClassAst(val) {
    return val.metadataKey === exports.MigrationMetadataKey;
}
exports.isMigrationClassAst = isMigrationClassAst;
class MigrationAst extends ims_common_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.MigrationAst = MigrationAst;
