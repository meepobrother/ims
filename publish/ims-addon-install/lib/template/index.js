"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
let ImsInstallTemplate = class ImsInstallTemplate {
};
ImsInstallTemplate = __decorate([
    ims_core_1.Template({
        mobiles: [],
        admins: [{
                path: '/',
                component: 'admin/install'
            }, {
                path: '/error/403',
                component: '403'
            }, {
                path: '/error/404',
                component: '404'
            }, {
                path: '/error/500',
                component: '500'
            }]
    })
], ImsInstallTemplate);
exports.ImsInstallTemplate = ImsInstallTemplate;
