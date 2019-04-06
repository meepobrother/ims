import { ClassAst, PropertyAst, ParameterAst } from 'ims-decorator'
import * as K from './keys';
import * as T from './type';

export function isAddonClassAst(val: ClassAst): val is ClassAst<T.AddonOptions> {
    return val.metadataKey === K.AddonMetadataKey;
}
export function isControllerClassAst(val: ClassAst): val is ClassAst<T.ControllerOptions> {
    return val.metadataKey === K.ControllerMetadataKey;
}
export function isRoleClassAst(val: ClassAst): val is ClassAst<T.RoleOptions> {
    return val.metadataKey === K.RoleMetadataKey;
}
export function isRouterClassAst(val: ClassAst): val is ClassAst<T.RouterOptions> {
    return val.metadataKey === K.RouterMetadataKey;
}
export function isTemplateClassAst(val: ClassAst): val is ClassAst<T.TemplateOptions> {
    return val.metadataKey === K.TemplateMetadataKey;
}
export function isTypeormClassAst(val: ClassAst): val is ClassAst<T.TypeormOptions> {
    return val.metadataKey === K.TypeormMetadataKey;
}
export function isCliClassAst(val: ClassAst): val is ClassAst<T.CliOptions> {
    return val.metadataKey === K.CliMetadataKey;
}
export function isCommandClassAst(val: ClassAst): val is ClassAst<T.CommandOptions> {
    return val.metadataKey === K.CommandMetadataKey;
}
export function isVersionPropertyAst(val: ClassAst): val is PropertyAst<T.VersionOptions> {
    return val.metadataKey === K.VersionMetadataKey;
}
export function isBodyParameterAst(val: ParameterAst): val is ParameterAst<T.BodyOptions> {
    return val.metadataKey === K.BodyMetadataKey;
}
export function isNextParameterAst(val: ParameterAst): val is ParameterAst<T.NextOptions> {
    return val.metadataKey === K.NextMetadataKey;
}
export function isQueryParameterAst(val: ParameterAst): val is ParameterAst<T.QueryOptions> {
    return val.metadataKey === K.QueryMetadataKey;
}
export function isRedirectParameterAst(val: ParameterAst): val is ParameterAst<T.RedirectOptions> {
    return val.metadataKey === K.RedirectMetadataKey;
}
export function isRenderParameterAst(val: ParameterAst): val is ParameterAst<T.RenderOptions> {
    return val.metadataKey === K.RenderMetadataKey;
}
export function isReqParameterAst(val: ParameterAst): val is ParameterAst<T.ReqOptions> {
    return val.metadataKey === K.ReqMetadataKey;
}
export function isResParameterAst(val: ParameterAst): val is ParameterAst<T.ResOptions> {
    return val.metadataKey === K.ResMetadataKey;
}
export function isSessionParameterAst(val: ParameterAst): val is ParameterAst<T.SessionOptions> {
    return val.metadataKey === K.SessionMetadataKey;
}
export function isUploadParameterAst(val: ParameterAst): val is ParameterAst<T.UploadOptions> {
    return val.metadataKey === K.UploadMetadataKey;
}
export function isUploadsParameterAst(val: ParameterAst): val is ParameterAst<T.UploadsOptions> {
    return val.metadataKey === K.UploadsMetadataKey;
}