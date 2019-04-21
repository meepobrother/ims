"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const ims_model_1 = require("ims-model");
let ImsCoreAdminerServer = class ImsCoreAdminerServer {
    getList() {
        return this.server.findAndCount();
    }
    async addServer(body) {
        try {
            const server = new ims_model_1.ImsServer();
            server.name = body.name;
            server.path = body.path;
            server.upstream = body.upstream;
            await this.server.save(server);
            return {
                code: 0,
                message: '保存成功'
            };
        }
        catch (e) {
            return {
                code: -1,
                message: '插入数据失败',
                error: {
                    message: e.message,
                    stack: e.stack
                }
            };
        }
    }
};
__decorate([
    ims_core_1.EntityRepository({
        db: 'system',
        target: ims_model_1.ImsServer
    }),
    __metadata("design:type", Object)
], ImsCoreAdminerServer.prototype, "server", void 0);
__decorate([
    ims_core_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImsCoreAdminerServer.prototype, "getList", null);
__decorate([
    ims_core_1.Post(),
    __param(0, ims_core_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImsCoreAdminerServer.prototype, "addServer", null);
ImsCoreAdminerServer = __decorate([
    ims_core_1.Controller({
        path: '/adminer/services'
    })
], ImsCoreAdminerServer);
exports.ImsCoreAdminerServer = ImsCoreAdminerServer;
