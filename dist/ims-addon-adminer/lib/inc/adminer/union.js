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
let ImsCoreAdminerUnion = class ImsCoreAdminerUnion {
    constructor() {
        this.infos = [];
    }
    getUnionList() {
        return this.infos;
    }
    addUnion(body) {
    }
};
__decorate([
    ims_core_1.P2p(),
    __metadata("design:type", Object)
], ImsCoreAdminerUnion.prototype, "p2p", void 0);
__decorate([
    ims_core_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImsCoreAdminerUnion.prototype, "getUnionList", null);
__decorate([
    ims_core_1.Post(),
    __param(0, ims_core_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImsCoreAdminerUnion.prototype, "addUnion", null);
ImsCoreAdminerUnion = __decorate([
    ims_core_1.Controller({
        path: '/adminer/union'
    }),
    __metadata("design:paramtypes", [])
], ImsCoreAdminerUnion);
exports.ImsCoreAdminerUnion = ImsCoreAdminerUnion;
