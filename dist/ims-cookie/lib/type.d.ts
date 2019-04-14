export declare type Cookie = any;
import { CookieSetOptions } from 'cookie';
export interface CookieGetOptions {
    doNotParse?: boolean;
}
export interface CookieChangeOptions {
    name: string;
    value?: any;
    options?: CookieSetOptions;
}
export declare type CookieChangeListener = (options: CookieChangeOptions) => void;
