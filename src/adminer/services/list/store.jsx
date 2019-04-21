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
const React = require("react");
const store_1 = __importDefault(require("../add/store"));
class ClusterHome {
    constructor() {
        this.list = [];
        this.columns = [{
                key: 'name',
                title: '名称',
                dataIndex: 'name'
            }, {
                key: 'path',
                title: '路径',
                dataIndex: 'path'
            }, {
                key: 'upstream',
                title: '主机',
                dataIndex: 'upstream',
                render: (item) => {
                    return <div>
                {item.map((li, key) => {
                        return <div key={key}>{li.ip}:{li.port}</div>;
                    })}
            </div>;
                }
            }, {
                render: (item) => {
                    return <div>
                <a onClick={() => this.edit(item)}>编辑</a>&nbsp;<a onClick={() => this.remove(item)}>移除</a>
            </div>;
                }
            }];
        this.activeTab = 'list';
    }
    edit(item) {
        store_1.default.setName(item.name);
        store_1.default.setPath(item.path);
        store_1.default.setUpstream(item.upstream);
        this.activeTab = 'add';
    }
    remove(item) {
    }
    getList() {
        return ims_util_1.default.http.get('/adminer/services/getList').then(res => {
            this.list = res.data[0];
            this.count = res.data[1];
        });
    }
    addCluster() {
        ims_adminer_1.history.push('/adminer/services/add');
    }
    setActiveTab(e) {
        this.activeTab = e;
        if (this.activeTab === 'add') {
            store_1.default.clear();
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], ClusterHome.prototype, "list", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], ClusterHome.prototype, "count", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], ClusterHome.prototype, "columns", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClusterHome.prototype, "edit", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClusterHome.prototype, "remove", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClusterHome.prototype, "getList", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClusterHome.prototype, "addCluster", null);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], ClusterHome.prototype, "activeTab", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClusterHome.prototype, "setActiveTab", null);
exports.ClusterHome = ClusterHome;
exports.default = new ClusterHome();
