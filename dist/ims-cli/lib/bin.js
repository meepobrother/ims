#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bootstrap_1 = tslib_1.__importDefault(require("./core/bootstrap"));
const ims_common_1 = require("ims-common");
const index_1 = require("./index");
let ImsCli = class ImsCli {
};
ImsCli = tslib_1.__decorate([
    ims_common_1.App({
        name: 'ims',
        version: '1.0.0',
        commands: [
            index_1.ImsCommandBuild, index_1.ImsCommandCreate, index_1.ImsCommandVersion
        ]
    })
], ImsCli);
exports.ImsCli = ImsCli;
bootstrap_1.default(ims_common_1.visitor.visitType(ImsCli));
