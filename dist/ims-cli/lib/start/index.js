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
const shelljs_1 = require("shelljs");
const fs_extra_1 = __importDefault(require("fs-extra"));
async function execSync(command) {
    return new Promise((resolve, reject) => {
        shelljs_1.exec(command, { cwd: process.cwd() }, (code, out, err) => {
            resolve(out);
        });
    });
}
let ImsStart = class ImsStart extends command_1.ImsCommand {
    constructor() {
        super(...arguments);
        this.dev = false;
    }
    async run() {
        const root = process.cwd();
        await execSync(`pm2 kill`);
        const devApps = [];
        fs_extra_1.default.ensureDirSync(path_1.join(root, 'config/pm2'));
        fs_extra_1.default.ensureDirSync(path_1.join(root, 'data/logs'));
        devApps.push({
            name: 'template_dev',
            script: path_1.join(__dirname, 'bin/template_dev.js'),
            output: path_1.join(root, 'data/logs/template_dev.log'),
            error: path_1.join(root, 'data/logs/template_dev-error.log')
        });
        devApps.push({
            name: 'dev',
            script: path_1.join(__dirname, 'bin/dev.js'),
            output: path_1.join(root, 'data/logs/dev.log'),
            error: path_1.join(root, 'data/logs/dev-error.log')
        });
        fs_extra_1.default.writeFileSync(path_1.join(root, 'config/pm2/dev.json'), JSON.stringify(devApps, null, 2));
        const prodApps = [];
        prodApps.push({
            name: 'prod',
            script: path_1.join(__dirname, 'bin/prod.js'),
            output: path_1.join(root, 'data/logs/prod.log'),
            error: path_1.join(root, 'data/logs/prod-error.log')
        });
        fs_extra_1.default.writeFileSync(path_1.join(root, 'config/pm2/prod.json'), JSON.stringify(prodApps, null, 2));
        if (this.dev) {
            await execSync(`pm2 start ${path_1.join(root, 'config/pm2/dev.json')} &`);
        }
        else {
            await execSync(`pm2 start ${path_1.join(root, 'config/pm2/prod.json')}`);
            await execSync(`node ${path_1.join(__dirname, 'bin/template_prod')}`);
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