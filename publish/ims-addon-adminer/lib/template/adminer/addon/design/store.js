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
class AddonDesign {
    constructor() {
        this.baseForm = {
            name: {
                item: {
                    required: true,
                    hasFeedback: false,
                    help: "请输入[a-z]",
                    validateStatus: 'validating',
                    label: '模块代号'
                },
                input: {
                    type: 'text',
                    placeholder: '请输入模块代号',
                    onChange: (e) => this.name = e.target.value
                }
            },
            title: {
                item: {
                    required: true,
                    hasFeedback: false,
                    help: "请输入3-12位汉子",
                    validateStatus: 'validating',
                    label: '模块名称'
                },
                input: {
                    type: 'text',
                    placeholder: '请输入模块名称',
                    onChange: (e) => this.title = e.target.value
                }
            },
            version: {
                item: {
                    required: true,
                    hasFeedback: false,
                    help: "请输入[0-9].[0-9].[0-9]",
                    validateStatus: 'validating',
                    label: '版本号'
                },
                input: {
                    type: 'text',
                    placeholder: '请输入版本号',
                    onChange: (e) => this.version = e.target.value
                }
            },
            author: {
                item: {
                    required: true,
                    hasFeedback: false,
                    help: "请输入作者",
                    validateStatus: 'validating',
                    label: '作者'
                },
                input: {
                    type: 'text',
                    placeholder: '请输入作者',
                    onChange: (e) => this.author = e.target.value
                }
            }
        };
        /** 接口 */
        this.incs = [];
        this.showAddInc = false;
        /** 数据 */
        this.entities = [];
        /** 模板 */
        this.template = [];
        this.step = 0;
        this.nextBtn = {
            title: '下一步',
            props: {
                onClick: () => this.next(),
                type: 'primary'
            }
        };
        this.prevBtn = {
            title: '上一步',
            props: {
                onClick: () => this.prev()
            }
        };
        this.loading = false;
    }
    next() {
        this.step += 1;
        if (this.step === 4) {
            this.nextBtn = {
                title: '创建模块',
                props: {
                    onClick: () => this.finish()
                }
            };
        }
    }
    finish() {
        this.loading = true;
        ims_util_1.default.http.post('/adminer/addon/designAddon', {
            name: `${this.author}_${this.name}`,
            title: this.title,
            version: this.version,
            author: this.author
        }).then(res => {
            const { data } = res;
            this.loading = false;
        });
    }
    prev() {
        this.step -= 1;
        this.nextBtn = {
            title: '下一步',
            props: {
                onClick: () => this.next()
            }
        };
    }
    addInc() {
        this.showAddInc = true;
        // this.incs.push({})
    }
    openAddInc() {
        this.showAddInc = true;
    }
    closeAddInc() {
        this.showAddInc = false;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AddonDesign.prototype, "name", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AddonDesign.prototype, "title", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AddonDesign.prototype, "version", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], AddonDesign.prototype, "author", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], AddonDesign.prototype, "baseForm", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], AddonDesign.prototype, "incs", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], AddonDesign.prototype, "showAddInc", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], AddonDesign.prototype, "step", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], AddonDesign.prototype, "nextBtn", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], AddonDesign.prototype, "prevBtn", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddonDesign.prototype, "next", null);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], AddonDesign.prototype, "loading", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddonDesign.prototype, "finish", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddonDesign.prototype, "prev", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddonDesign.prototype, "addInc", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddonDesign.prototype, "openAddInc", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AddonDesign.prototype, "closeAddInc", null);
exports.AddonDesign = AddonDesign;
exports.default = new AddonDesign();
