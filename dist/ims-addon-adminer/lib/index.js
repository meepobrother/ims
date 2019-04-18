"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const template_1 = require("./template");
const typeorm_1 = require("./typeorm");
const inc_1 = require("./inc");
let ImsAddonAdminer = class ImsAddonAdminer {
};
ImsAddonAdminer = __decorate([
    ims_core_1.Addon({
        template: template_1.ImsAdminerTemplate,
        typeorm: typeorm_1.ImsCoreAdminerTypeorm,
        incs: [
            inc_1.ImsCoreAdminerDashboard, inc_1.ImsCoreAdminerServer,
            inc_1.ImsCoreAdminerSetting, inc_1.ImsCoreAdminerUnion,
            inc_1.ImsCoreAdminerUser
        ],
        sourceRoot: __dirname,
        path: '/'
    })
], ImsAddonAdminer);
exports.default = ImsAddonAdminer;
