import { ClassAst, PropertyAst, ParameterAst } from 'ims-decorator';
import * as T from './type';
export declare function isAddonClassAst(val: ClassAst): val is ClassAst<T.AddonOptions>;
export declare function isControllerClassAst(val: ClassAst): val is ClassAst<T.ControllerOptions>;
export declare function isRoleClassAst(val: ClassAst): val is ClassAst<T.RoleOptions>;
export declare function isRouterClassAst(val: ClassAst): val is ClassAst<T.RouterOptions>;
export declare function isTemplateClassAst(val: ClassAst): val is ClassAst<T.TemplateOptions>;
export declare function isTypeormClassAst(val: ClassAst): val is ClassAst<T.TypeormOptions>;
export declare function isCliClassAst(val: ClassAst): val is ClassAst<T.CliOptions>;
export declare function isCommandClassAst(val: ClassAst): val is ClassAst<T.CommandOptions>;
export declare function isVersionPropertyAst(val: ClassAst): val is PropertyAst<T.VersionOptions>;
export declare function isBodyParameterAst(val: ParameterAst): val is ParameterAst<T.BodyOptions>;
export declare function isNextParameterAst(val: ParameterAst): val is ParameterAst<T.NextOptions>;
export declare function isQueryParameterAst(val: ParameterAst): val is ParameterAst<T.QueryOptions>;
export declare function isRedirectParameterAst(val: ParameterAst): val is ParameterAst<T.RedirectOptions>;
export declare function isRenderParameterAst(val: ParameterAst): val is ParameterAst<T.RenderOptions>;
export declare function isReqParameterAst(val: ParameterAst): val is ParameterAst<T.ReqOptions>;
export declare function isResParameterAst(val: ParameterAst): val is ParameterAst<T.ResOptions>;
export declare function isSessionParameterAst(val: ParameterAst): val is ParameterAst<T.SessionOptions>;
export declare function isUploadParameterAst(val: ParameterAst): val is ParameterAst<T.UploadOptions>;
export declare function isUploadsParameterAst(val: ParameterAst): val is ParameterAst<T.UploadsOptions>;