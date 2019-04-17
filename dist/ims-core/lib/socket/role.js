"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
;
exports.RoleMetadataKey = 'RoleMetadataKey';
exports.Role = ims_decorator_1.makeDecorator(exports.RoleMetadataKey);
// 判断是否有权限访问某个函数
function isRoleMethodAst(val) {
    return val.metadataKey === exports.RoleMetadataKey;
}
exports.isRoleMethodAst = isRoleMethodAst;
class RoleMethodAst extends ims_decorator_1.MethodContext {
}
exports.RoleMethodAst = RoleMethodAst;
// 控制是否有权限访问某个字段 用在Entity
function isRolePropertyAst(val) {
    return val.metadataKey === exports.RoleMetadataKey;
}
exports.isRolePropertyAst = isRolePropertyAst;
class RolePropertyAst extends ims_decorator_1.PropertyContext {
}
exports.RolePropertyAst = RolePropertyAst;
// 动态判断是否拥有权限
function isRoleParameterAst(val) {
    return val.metadataKey === exports.RoleMetadataKey;
}
exports.isRoleParameterAst = isRoleParameterAst;
class RoleParameterAst extends ims_decorator_1.ParameterContext {
}
exports.RoleParameterAst = RoleParameterAst;
