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
const mobx_1 = require("mobx");
const ims_util_1 = __importDefault(require("ims-util"));
const ims_adminer_1 = require("ims-adminer");
class Add {
    constructor() {
        this.upstream = [];
    }
    setUpstream(upstream) {
        this.upstream = upstream;
    }
    setIp(ip) {
        this.ip = ip;
    }
    setPort(port) {
        this.port = port;
    }
    setName(name) {
        this.name = name;
    }
    setPath(path) {
        this.path = path;
    }
    switchModel() {
        this.modelVisible = !this.modelVisible;
    }
    addServer() {
        let data = {
            name: this.name,
            path: this.path,
            upstream: this.upstream
        };
        ims_util_1.default.http.post('/adminer/services/addServer', data).then(res => {
            const { data } = res;
            if (data.code === 0) {
                ims_adminer_1.history.push('/adminer/services');
            }
            else {
            }
        });
    }
    addHost() {
        console.log(this);
        this.switchModel();
        this.upstream.push({
            ip: this.ip,
            port: this.port
        });
        this.ip = '';
        this.port = undefined;
    }
    removeHost(index) {
        const upstream = this.upstream;
        upstream.splice(index, 1);
        this.upstream = upstream;
    }
    clear() {
        this.setName('');
        this.setPath('');
        this.upstream = [];
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Add.prototype, "name", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Add.prototype, "path", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Add.prototype, "ip", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], Add.prototype, "upstream", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Add.prototype, "setUpstream", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Add.prototype, "setIp", null);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], Add.prototype, "port", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Add.prototype, "setPort", null);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], Add.prototype, "modelVisible", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Add.prototype, "setName", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Add.prototype, "setPath", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Add.prototype, "switchModel", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Add.prototype, "addServer", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Add.prototype, "addHost", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Add.prototype, "removeHost", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Add.prototype, "clear", null);
exports.Add = Add;
exports.default = new Add();
