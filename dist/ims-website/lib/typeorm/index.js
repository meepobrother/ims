"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
let ImsWebsiteTypeorm = class ImsWebsiteTypeorm {
};
ImsWebsiteTypeorm = tslib_1.__decorate([
    ims_core_1.Typeorm({
        entities: [],
        migrations: [],
        subscribers: []
    })
], ImsWebsiteTypeorm);
exports.ImsWebsiteTypeorm = ImsWebsiteTypeorm;
