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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const os_1 = __importDefault(require("os"));
const shelljs_1 = require("shelljs");
const ims_node_1 = require("ims-node");
const pm2_1 = require("pm2");
const ps = require("current-processes");
let ImsCoreAdminerDashboard = class ImsCoreAdminerDashboard {
    async updateAnalysis() {
        return {
            hostname: os_1.default.hostname(),
            uptime: os_1.default.uptime(),
            freemem: os_1.default.freemem(),
            totalmem: os_1.default.totalmem(),
            cpus: os_1.default.cpus(),
            type: os_1.default.type(),
            release: os_1.default.release(),
            networkInterfaces: os_1.default.networkInterfaces(),
            homedir: os_1.default.homedir(),
            platform: os_1.default.platform(),
            tmpdir: os_1.default.tmpdir(),
            arch: os_1.default.arch(),
            avg: os_1.default.loadavg(),
            processes: await this.getProcesses(),
            pm2: await this.pm2List(),
            node: {
                path: process.execPath,
                cwd: process.cwd(),
                versions: process.versions,
                npm: await ims_node_1.execSync(`npm -v`)
            }
        };
    }
    getProcesses() {
        return new Promise((resolve, reject) => {
            ps.get((err, processes) => {
                if (err)
                    reject(err);
                resolve(processes);
            });
        });
    }
    /** 重新启动 */
    restart() {
        shelljs_1.exec(`pm2 retart all`);
    }
    killPid(body) {
        shelljs_1.exec(`killall ${body.id}`);
    }
    pm2List() {
        const titles = {
            dev: '服务',
            template_dev: '模板',
            prod: '服务',
            template_prod: '模板'
        };
        return new Promise((resolve, reject) => {
            pm2_1.list((err, processDescriptionList) => {
                if (err)
                    reject(err);
                const lis = processDescriptionList.map((li, key) => {
                    return {
                        name: li.name,
                        title: titles[li.name] || `任务${key}`,
                        pid: li.pid,
                        pm_id: li.pm_id,
                        monit: li.monit
                    };
                });
                resolve(lis);
            });
        });
    }
};
__decorate([
    ims_core_1.Get(),
    ims_core_1.Role(['admin']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImsCoreAdminerDashboard.prototype, "updateAnalysis", null);
__decorate([
    ims_core_1.Post(),
    ims_core_1.Role(['admin']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImsCoreAdminerDashboard.prototype, "restart", null);
__decorate([
    ims_core_1.Post(),
    __param(0, ims_core_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImsCoreAdminerDashboard.prototype, "killPid", null);
ImsCoreAdminerDashboard = __decorate([
    ims_core_1.Controller({
        path: '/adminer/dashboard'
    })
], ImsCoreAdminerDashboard);
exports.ImsCoreAdminerDashboard = ImsCoreAdminerDashboard;
