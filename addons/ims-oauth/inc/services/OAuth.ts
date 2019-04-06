import querystring = require('querystring');
import { request, RequestOptions } from 'urllib';
import { ImsError } from './error';
import { AccessToken } from './AccessToken';
export class ImsOAuthService {
    constructor(
        public appid: string,
        public appsecret: string,
        public isMiniProgram: boolean
    ) {

    }

    async request(url: string, opts: RequestOptions = {}) {
        try {
            const res = await request(url, opts);
            const { data } = res;
            if (data.errcode) {
                const err = new ImsError(data.errmsg);
                err.name = 'ImsOAuthService';
                err.code = data.errcode;
                throw err;
            }
            return data;
        } catch (e) {
            throw new Error(`ImsOAuthService: ${e.name}`)
        }
    }

    getAuthorizeURL(redirect: string, state: string = '', scope: 'snsapi_base' | 'snsapi_userinfo' = 'snsapi_base') {
        const url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        const info = {
            appid: this.appid,
            redirect_uri: redirect,
            response_type: 'code',
            scope: scope,
            state: state
        };
        return url + '?' + querystring.stringify(info) + '#wechat_redirect';
    }

    getAuthorizeURLForWebsite(redirect: string, state: string = '', scope: string = 'snsapi_login') {
        const url = 'https://open.weixin.qq.com/connect/qrconnect';
        const info = {
            appid: this.appid,
            redirect_uri: redirect,
            response_type: 'code',
            scope: scope,
            state: state
        };
        return url + '?' + querystring.stringify(info) + '#wechat_redirect';
    }

    async getAccessToken(code: string) {
        const url = 'https://api.weixin.qq.com/sns/oauth2/access_token';
        const info = {
            appid: this.appid,
            secret: this.appsecret,
            code: code,
            grant_type: 'authorization_code'
        };
        const args = {
            data: info,
            dataType: 'json'
        };
        return await this.request(url, args);
    }

    async getSessionKey(code: string) {
        const url = 'https://api.weixin.qq.com/sns/jscode2session';
        const info = {
            appid: this.appid,
            secret: this.appsecret,
            js_code: code,
            grant_type: 'authorization_code',
        };
        const args = {
            data: info,
            dataType: 'json'
        };
        return await this.request(url, args);
    }

    async refreshAccessToken(refreshToken: string) {
        const url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token';
        const info = {
            appid: this.appid,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        };
        const args = {
            data: info,
            dataType: 'json'
        };
        return await this.request(url, args);
    }

    async verifyToken(openid: string, accessToken: string) {
        const url = 'https://api.weixin.qq.com/sns/auth';
        const info = {
            access_token: accessToken,
            openid: openid
        };
        const args = {
            data: info,
            dataType: 'json'
        };
        return await this.request(url, args);
    }

    async getUserByCode(options: string | { lang: string, code: string }) {
        let lang: string, code: string;
        if (typeof options === 'string') {
            code = options;
        } else {
            lang = options.lang;
            code = options.code;
        }
        const data = await this.getAccessToken(code);
        const openid = data.openid;
        return await this.getUser({ openid: openid, lang: lang });
    }

    async getUser(opt: string | { openid: string, lang?: string }) {
        let options: { openid: string, lang?: string };
        if (typeof opt === 'string') {
            options = {
                openid: opt
            }
        } else {
            options = opt;
        }
        const token = await this.getToken(options.openid);
        if (token.isValid()) {
            return await this._getUser(options, token.data.access_token);
        } else {
            await this.refreshAccessToken(token.data.refresh_token);
            return await this._getUser(options, token.data.access_token);
        }
    }

    private async _getUser(options: { openid: string, lang?: string }, accessToken: string) {
        const url = 'https://api.weixin.qq.com/sns/userinfo';
        const info = {
            access_token: accessToken,
            openid: options.openid,
            lang: options.lang || 'en'
        };
        const args = {
            data: info,
            dataType: 'json'
        };
        return await this.request(url, args);
    };

    store: Map<string, AccessToken> = new Map();
    async getToken(openid: string): Promise<AccessToken> {
        return this.store.get(openid)
    }
}