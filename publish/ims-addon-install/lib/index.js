"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const inc_1 = require("./inc");
const template_1 = require("./template");
let ImsAddonInstall = class ImsAddonInstall {
};
ImsAddonInstall = __decorate([
    ims_core_1.Addon({
        incs: [inc_1.ImsIndex],
        template: template_1.ImsInstallTemplate,
        sourceRoot: __dirname,
        path: '/',
        dev: true
    })
], ImsAddonInstall);
exports.default = ImsAddonInstall;
