"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
let ImsAdminerTypeorm = class ImsAdminerTypeorm {
};
ImsAdminerTypeorm = tslib_1.__decorate([
    ims_core_1.Typeorm({
        entities: [],
        migrations: [],
        subscribers: []
    })
], ImsAdminerTypeorm);
exports.ImsAdminerTypeorm = ImsAdminerTypeorm;
