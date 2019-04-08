"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const K = tslib_1.__importStar(require("./keys"));
function isAddonClassAst(val) {
    return val.metadataKey === K.AddonMetadataKey;
}
exports.isAddonClassAst = isAddonClassAst;
function isControllerClassAst(val) {
    return val.metadataKey === K.ControllerMetadataKey;
}
exports.isControllerClassAst = isControllerClassAst;
function isRoleClassAst(val) {
    return val.metadataKey === K.RoleMetadataKey;
}
exports.isRoleClassAst = isRoleClassAst;
function isRouterClassAst(val) {
    return val.metadataKey === K.RouterMetadataKey;
}
exports.isRouterClassAst = isRouterClassAst;
function isTemplateClassAst(val) {
    return val.metadataKey === K.TemplateMetadataKey;
}
exports.isTemplateClassAst = isTemplateClassAst;
function isTypeormClassAst(val) {
    return val.metadataKey === K.TypeormMetadataKey;
}
exports.isTypeormClassAst = isTypeormClassAst;
function isCliClassAst(val) {
    return val.metadataKey === K.CliMetadataKey;
}
exports.isCliClassAst = isCliClassAst;
function isCommandClassAst(val) {
    return val.metadataKey === K.CommandMetadataKey;
}
exports.isCommandClassAst = isCommandClassAst;
function isVersionPropertyAst(val) {
    return val.metadataKey === K.VersionMetadataKey;
}
exports.isVersionPropertyAst = isVersionPropertyAst;
function isBodyParameterAst(val) {
    return val.metadataKey === K.BodyMetadataKey;
}
exports.isBodyParameterAst = isBodyParameterAst;
function isNextParameterAst(val) {
    return val.metadataKey === K.NextMetadataKey;
}
exports.isNextParameterAst = isNextParameterAst;
function isQueryParameterAst(val) {
    return val.metadataKey === K.QueryMetadataKey;
}
exports.isQueryParameterAst = isQueryParameterAst;
function isRedirectParameterAst(val) {
    return val.metadataKey === K.RedirectMetadataKey;
}
exports.isRedirectParameterAst = isRedirectParameterAst;
function isRenderParameterAst(val) {
    return val.metadataKey === K.RenderMetadataKey;
}
exports.isRenderParameterAst = isRenderParameterAst;
function isReqParameterAst(val) {
    return val.metadataKey === K.ReqMetadataKey;
}
exports.isReqParameterAst = isReqParameterAst;
function isResParameterAst(val) {
    return val.metadataKey === K.ResMetadataKey;
}
exports.isResParameterAst = isResParameterAst;
function isSessionParameterAst(val) {
    return val.metadataKey === K.SessionMetadataKey;
}
exports.isSessionParameterAst = isSessionParameterAst;
function isUploadParameterAst(val) {
    return val.metadataKey === K.UploadMetadataKey;
}
exports.isUploadParameterAst = isUploadParameterAst;
function isUploadsParameterAst(val) {
    return val.metadataKey === K.UploadsMetadataKey;
}
exports.isUploadsParameterAst = isUploadsParameterAst;