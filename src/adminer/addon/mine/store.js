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
const moment = require("moment");
class AddonMine {
    constructor() {
        this.list = [];
        this.columns = [{
                title: '代号',
                key: 'name',
                dataIndex: 'name'
            }, {
                title: '名称',
                key: 'title',
                dataIndex: 'title'
            }, {
                title: '版本号',
                key: 'version',
                dataIndex: 'version'
            }, {
                title: '作者',
                key: 'author',
                dataIndex: 'author'
            }, {
                title: '创建时间',
                key: 'create_at',
                dataIndex: 'create_at',
                render: (item) => {
                    return moment(item).format('YYYY-MM-DD');
                }
            }];
    }
    getMineAddons() {
        ims_util_1.default.http.get('/adminer/addon/mineAddons').then(res => {
            const { data } = res;
            this.list = data[0];
            this.count = data[1];
        });
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], AddonMine.prototype, "list", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], AddonMine.prototype, "count", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], AddonMine.prototype, "columns", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddonMine.prototype, "getMineAddons", null);
exports.AddonMine = AddonMine;
exports.default = new AddonMine();
