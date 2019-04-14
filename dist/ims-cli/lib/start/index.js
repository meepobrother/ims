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
const command_1 = require("../command");
const path_1 = require("path");
const fs_extra_1 = __importDefault(require("fs-extra"));
const ims_node_1 = require("ims-node");
const os_1 = require("os");
// 生成watch文件
let ImsStart = class ImsStart extends command_1.ImsCommand {
    // 生成watch文件
    constructor() {
        super(...arguments);
        this.dev = false;
    }
    async run() {
        const root = process.cwd();
        await ims_node_1.execSync(`pm2 kill`);
        const devApps = [];
        await ims_node_1.rmrf(path_1.join(root, 'config/pm2'));
        await ims_node_1.rmrf(path_1.join(root, 'data/logs'));
        fs_extra_1.default.ensureDirSync(path_1.join(root, 'config/pm2'));
        fs_extra_1.default.ensureDirSync(path_1.join(root, 'data/logs'));
        devApps.push({
            name: 'dev',
            script: path_1.join(__dirname, 'bin', 'dev.js'),
            output: path_1.join(root, 'data/logs/dev.log'),
            error: path_1.join(root, 'data/logs/dev-error.log')
        });
        devApps.push({
            name: 'template_dev',
            script: path_1.join(__dirname, 'bin/template_dev.js'),
            output: path_1.join(root, 'data/logs/template_dev.log'),
            error: path_1.join(root, 'data/logs/template_dev-error.log')
        });
        fs_extra_1.default.writeFileSync(path_1.join(root, 'config/pm2/dev.json'), JSON.stringify(devApps, null, 2));
        const prodApps = [];
        prodApps.push({
            name: 'prod',
            script: path_1.join(__dirname, 'bin/prod.js'),
            output: path_1.join(root, 'data/logs/prod.log'),
            error: path_1.join(root, 'data/logs/prod-error.log'),
            instances: os_1.cpus().length,
            exec_mode: '‘cluster’'
        });
        fs_extra_1.default.writeFileSync(path_1.join(root, 'config/pm2/prod.json'), JSON.stringify(prodApps, null, 2));
        if (this.dev) {
            await ims_node_1.execSync(`pm2 start ${path_1.join(root, 'config/pm2/dev.json')}`);
            // await execSync(`node ${join(__dirname, 'bin/template_dev')}`)
        }
        else {
            await ims_node_1.execSync(`pm2 start ${path_1.join(root, 'config/pm2/prod.json')}`);
            await ims_node_1.execSync(`node ${path_1.join(__dirname, 'bin/template_prod')}`);
        }
        console.log(`服务启动成功`);
    }
};
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
