"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./storage");
const ws_1 = require("./ws");
const http_1 = require("./http");
const router_1 = require("./router");
class ImsUtil {
    static async onInit(routes) {
        this.storage = await storage_1.ImsStorage.create();
        this.ws = await ws_1.ImsWs.create();
        this.http = await http_1.ImsHttp.create();
        this.router = new router_1.ImsRouter({
            routes: routes
        });
    }
}
exports.ImsUtil = ImsUtil;
exports.default = ImsUtil;
