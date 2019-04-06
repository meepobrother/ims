"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsHttp {
    static async create() {
        return new ImsHttp();
    }
    get(url) {
        return (params = {}) => {
            return fetch(`${url}?${params.join('&')}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json());
        };
    }
    post(url) {
        return (body) => {
            return fetch(url, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json());
        };
    }
}
exports.ImsHttp = ImsHttp;
