"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./storage");
const ws_1 = require("./ws");
const router_1 = require("./router");
const axios_1 = __importDefault(require("axios"));
const ims_cookie_1 = require("ims-cookie");
const store_1 = __importDefault(require("store"));
axios_1.default.interceptors.request.use((config) => {
    const token = ImsUtil.cookie.get('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});
axios_1.default.interceptors.response.use(res => {
    return res;
}, err => {
    if (err.response) {
        switch (err.response.status) {
            case 401:
                ImsUtil.cookie.remove('token');
                break;
            case 404:
                break;
            default:
                console.log(`err.response.status`, err.response.status);
                break;
        }
    }
    return Promise.reject(err.response.data);
});
class ImsUtil {
    static createHttp(opt) {
        return axios_1.default.create(opt);
    }
    static async onInit(routes) {
        this.storage = await storage_1.ImsStorage.create();
        this.ws = await ws_1.ImsWs.create();
        this.router = new router_1.ImsRouter({
            routes: routes
        });
    }
}
ImsUtil.http = axios_1.default;
ImsUtil.cookie = new ims_cookie_1.ImsCookie(document.cookie);
ImsUtil.store = store_1.default;
exports.ImsUtil = ImsUtil;
exports.default = ImsUtil;
