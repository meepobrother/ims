"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const command_1 = require("../command");
let ImsStart = class ImsStart extends command_1.ImsCommand {
    run() {
        // 安装器
    }
};
tslib_1.__decorate([
    ims_core_1.Input(),
    tslib_1.__metadata("design:type", Number)
], ImsStart.prototype, "port", void 0);
ImsStart = tslib_1.__decorate([
    ims_core_1.Command({
        name: 'start'
    })
], ImsStart);
exports.ImsStart = ImsStart;
