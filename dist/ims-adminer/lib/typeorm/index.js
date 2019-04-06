"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const entities = tslib_1.__importStar(require("./entities"));
let ImsAdminTypeorm = class ImsAdminTypeorm {
};
ImsAdminTypeorm = tslib_1.__decorate([
    ims_core_1.Typeorm({
        entities: entities,
        migrations: [],
        subscribers: []
    })
], ImsAdminTypeorm);
exports.ImsAdminTypeorm = ImsAdminTypeorm;
tslib_1.__exportStar(require("./entities"), exports);
