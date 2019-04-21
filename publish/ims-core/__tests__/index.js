"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const command1_1 = require("./command1");
const command2_1 = require("./command2");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const pkg = require('../package.json');
let ImsCli = class ImsCli {
};
ImsCli = __decorate([
    ims_core_1.Cli({
        name: 'ims-cli',
        version: pkg.version,
        commands: [
            command1_1.ImsCommand1,
            command2_1.ImsCommand2
        ]
    })
], ImsCli);
exports.ImsCli = ImsCli;
util_1.transformCli(ims_common_1.visitor.visitType(ImsCli));
