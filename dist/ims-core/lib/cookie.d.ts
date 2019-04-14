import { ParameterAst, ParameterContext } from 'ims-decorator';
export declare const CookieMetadataKey = "CookieMetadataKey";
export declare type CookieOptions = string;
export declare const Cookie: (metadataDef?: string & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isCookieParameterAst(val: ParameterAst): val is ParameterAst<CookieOptions>;
export declare class CookieParameterAst extends ParameterContext<CookieOptions> {
}
import { ImsCookie } from 'ims-cookie';
export interface Cookie extends ImsCookie {
}
