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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const fs_extra_1 = __importDefault(require("fs-extra"));
const command_1 = require("../command");
const path_1 = require("path");
let ImsInit = class ImsInit extends command_1.ImsCommand {
    constructor() {
        super(...arguments);
        /** 目录 */
        this.path = 'ims';
    }
    run() {
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path));
        /** 模板 */
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path, 'template'));
        /** 附近 */
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path, 'attachment'));
        /** 应用 */
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path, 'addons'));
        /** 数据 */
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path, 'data'));
        /** 开发中 */
        fs_extra_1.default.ensureDirSync(path_1.join(this.root, this.path, 'packages'));
        /** package.json */
        fs_extra_1.default.copyFileSync(path_1.join(__dirname, 'template', 'package.json'), path_1.join(this.root, this.path, 'package.json'));
        /** tsconfig.json */
        fs_extra_1.default.copyFileSync(path_1.join(__dirname, 'template', 'package.json'), path_1.join(this.root, this.path, 'tsconfig.json'));
    }
};
__decorate([
    ims_core_1.Input({
        alis: 'p'
    }),
    __metadata("design:type", String)
], ImsInit.prototype, "path", void 0);
ImsInit = __decorate([
    ims_core_1.Command({
        name: 'init',
        alis: 'i'
    })
], ImsInit);
exports.ImsInit = ImsInit;
