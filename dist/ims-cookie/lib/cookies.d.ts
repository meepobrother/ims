import * as cookie from 'cookie';
import { Cookie, CookieGetOptions, CookieChangeListener } from './type';
export declare class ImsCookie {
    private cookies;
    private changeListeners;
    private HAS_DOCUMENT_COOKIE;
    TESTING_ONETWO: number;
    constructor(cookies?: string | object | null);
    private _updateBrowserValues;
    private _emitChange;
    get(name: string, options?: CookieGetOptions): any;
    getAll(options?: CookieGetOptions): {
        [name: string]: any;
    };
    set(name: string, value: Cookie, options?: cookie.CookieSetOptions): void;
    remove(name: string, options?: cookie.CookieSetOptions): void;
    addChangeListener(callback: CookieChangeListener): void;
    removeChangeListener(callback: CookieChangeListener): void;
}
