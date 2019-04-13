import { makeDecorator, ParameterAst, ParameterContext } from 'ims-decorator';
export const CookieMetadataKey = 'CookieMetadataKey';
export type CookieOptions = string;
export const Cookie = makeDecorator<CookieOptions>(CookieMetadataKey);
export function isCookieParameterAst(val: ParameterAst): val is ParameterAst<CookieOptions> {
    return val.metadataKey === CookieMetadataKey;
}
export class CookieParameterAst extends ParameterContext<CookieOptions> { }

import { ImsCookie } from 'ims-cookie';
export interface Cookie extends ImsCookie { }