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
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const index_service_1 = require("./index.service");
let ImsIndexController = class ImsIndexController {
    async loadMore() {
        return {
            code: 0,
            message: '获取成功',
            data: {
                list: this.index.loadMore()
            }
        };
    }
};
__decorate([
    ims_core_1.Inject(),
    __metadata("design:type", index_service_1.ImsIndexInjectable)
], ImsIndexController.prototype, "index", void 0);
__decorate([
    ims_core_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ImsIndexController.prototype, "loadMore", null);
ImsIndexController = __decorate([
    ims_core_1.Controller({
        /** 路由路径 */
        path: '/',
        /** 子路由 */
        childern: []
    })
], ImsIndexController);
exports.ImsIndexController = ImsIndexController;
