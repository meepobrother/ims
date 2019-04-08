"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const template_1 = require("./template");
const typeorm_1 = require("./typeorm");
const incs = tslib_1.__importStar(require("./inc"));
let ImsAdminer = class ImsAdminer {
};
ImsAdminer = tslib_1.__decorate([
    ims_core_1.Addon({
        name: '核心',
        icon: '',
        author: 'ims',
        version: '0.01',
        desc: 'IMS核心',
        incs: incs,
        template: template_1.ImsAdminerTemplate,
        typeorm: typeorm_1.ImsAdminerTypeorm,
        type: 'system',
        sourceRoot: __dirname
    })
], ImsAdminer);
exports.ImsAdminer = ImsAdminer;
