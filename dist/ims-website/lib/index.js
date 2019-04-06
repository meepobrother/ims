"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const template_1 = require("./template");
const typeorm_1 = require("./typeorm");
/**
 * 官网
 */
let ImsWebsite = class ImsWebsite {
};
ImsWebsite = tslib_1.__decorate([
    ims_core_1.Addon({
        sourceRoot: __dirname,
        template: template_1.ImsWebsiteTemplate,
        typeorm: typeorm_1.ImsWebsiteTypeorm
    })
], ImsWebsite);
exports.default = ImsWebsite;
