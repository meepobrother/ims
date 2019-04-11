export function parse<T extends object>(str: string, options?: ParseOptions): T;
export function serialize(name: string, val: string, options?: CookieSetOptions): string;
export interface ParseOptions {
    encode?: (str: string) => string;
}
export interface CookieSetOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | 'lax' | 'strict';
    decode?: (str: string) => string;
}
