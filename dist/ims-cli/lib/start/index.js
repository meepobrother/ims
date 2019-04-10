"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const command_1 = require("../command");
const bootstrap_1 = require("./bootstrap");
const path_1 = require("path");
let ImsStart = class ImsStart extends command_1.ImsCommand {
    constructor() {
        super(...arguments);
        this.source = '';
        this.dev = false;
    }
    run() {
        // 安装器
        bootstrap_1.bootstrap(path_1.join(this.root, this.source), this.dev);
    }
};
__decorate([
    ims_core_1.Input({
        alis: 's'
    }),
    __metadata("design:type", String)
], ImsStart.prototype, "source", void 0);
__decorate([
    ims_core_1.Input({
        alis: 'd'
    }),
    __metadata("design:type", Boolean)
], ImsStart.prototype, "dev", void 0);
ImsStart = __decorate([
    ims_core_1.Command({
        name: 'start'
    })
], ImsStart);
exports.ImsStart = ImsStart;
