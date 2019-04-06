import { RequestOptions } from 'urllib';
import { AccessToken } from './AccessToken';
export declare class ImsOAuthService {
    appid: string;
    appsecret: string;
    isMiniProgram: boolean;
    constructor(appid: string, appsecret: string, isMiniProgram: boolean);
    request(url: string, opts?: RequestOptions): Promise<any>;
    getAuthorizeURL(redirect: string, state?: string, scope?: 'snsapi_base' | 'snsapi_userinfo'): string;
    getAuthorizeURLForWebsite(redirect: string, state?: string, scope?: string): string;
    getAccessToken(code: string): Promise<any>;
    getSessionKey(code: string): Promise<any>;
    refreshAccessToken(refreshToken: string): Promise<any>;
    verifyToken(openid: string, accessToken: string): Promise<any>;
    getUserByCode(options: string | {
        lang: string;
        code: string;
    }): Promise<any>;
    getUser(opt: string | {
        openid: string;
        lang?: string;
    }): Promise<any>;
    private _getUser;
    store: Map<string, AccessToken>;
    getToken(openid: string): Promise<AccessToken>;
}
