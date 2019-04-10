"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.TableInheritanceMetadataKey = 'TableInheritanceMetadataKey';
exports.TableInheritance = ims_decorator_1.makeDecorator(exports.TableInheritanceMetadataKey);
function isTableInheritanceClassAst(val) {
    return val.metadataKey === exports.TableInheritanceMetadataKey;
}
exports.isTableInheritanceClassAst = isTableInheritanceClassAst;
class TableInheritanceAst extends ims_decorator_1.ClassContext {
}
exports.TableInheritanceAst = TableInheritanceAst;
