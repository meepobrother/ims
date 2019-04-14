#!/usr/bin/env node
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("./core/bootstrap");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const index_1 = require("./index");
const init_1 = require("./init");
const start_1 = require("./start");
const buildAll_1 = require("./buildAll");
let ImsCli = class ImsCli {
};
ImsCli = __decorate([
    ims_core_1.App({
        name: 'ims',
        version: '1.0.0',
        commands: [
            index_1.ImsBuild, init_1.ImsInit, start_1.ImsStart,
            buildAll_1.ImsBuildAll
        ]
    })
], ImsCli);
exports.ImsCli = ImsCli;
bootstrap_1.bootstrap(ims_common_1.visitor.visitType(ImsCli));
