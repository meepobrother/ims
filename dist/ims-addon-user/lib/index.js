"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const typeorm_1 = require("./typeorm");
const template_1 = require("./template");
const incs = __importStar(require("./inc"));
/**
 * 用户管理
 */
let ImsAddonUser = class ImsAddonUser {
};
ImsAddonUser = __decorate([
    ims_core_1.Addon({
        incs,
        typeorm: typeorm_1.ImsAddonUserTypeorm,
        template: template_1.ImsAddonUserTemplate
    })
], ImsAddonUser);
exports.ImsAddonUser = ImsAddonUser;
