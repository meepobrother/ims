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
/**
 * 安装插件
 **/
let ImsAddonEntity = class ImsAddonEntity {
};
__decorate([
    ims_core_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ImsAddonEntity.prototype, "id", void 0);
__decorate([
    ims_core_1.Column(),
    __metadata("design:type", String)
], ImsAddonEntity.prototype, "title", void 0);
__decorate([
    ims_core_1.Column(),
    __metadata("design:type", String)
], ImsAddonEntity.prototype, "entry", void 0);
__decorate([
    ims_core_1.Column(),
    __metadata("design:type", String)
], ImsAddonEntity.prototype, "author", void 0);
__decorate([
    ims_core_1.Column(),
    __metadata("design:type", String)
], ImsAddonEntity.prototype, "icon", void 0);
__decorate([
    ims_core_1.Column(),
    __metadata("design:type", String)
], ImsAddonEntity.prototype, "thumbs", void 0);
__decorate([
    ims_core_1.Column(),
    __metadata("design:type", String)
], ImsAddonEntity.prototype, "desc", void 0);
__decorate([
    ims_core_1.Column(),
    __metadata("design:type", Boolean)
], ImsAddonEntity.prototype, "enable", void 0);
__decorate([
    ims_core_1.Column(),
    __metadata("design:type", String)
], ImsAddonEntity.prototype, "version", void 0);
__decorate([
    ims_core_1.CreateDateColumn(),
    __metadata("design:type", String)
], ImsAddonEntity.prototype, "create_at", void 0);
__decorate([
    ims_core_1.UpdateDateColumn(),
    __metadata("design:type", String)
], ImsAddonEntity.prototype, "update_at", void 0);
ImsAddonEntity = __decorate([
    ims_core_1.Entity({
        name: 'ims_addon'
    })
], ImsAddonEntity);
exports.ImsAddonEntity = ImsAddonEntity;
