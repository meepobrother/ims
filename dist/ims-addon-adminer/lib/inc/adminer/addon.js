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
const ims_model_1 = require("ims-model");
const ims_node_1 = require("ims-node");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const root = process.cwd();
const index_1 = __importDefault(require("./template/index"));
const index_2 = __importDefault(require("./template/template/index"));
const index_3 = __importDefault(require("./template/inc/index"));
const index_4 = __importDefault(require("./template/typeorm/entities/index"));
const index_5 = __importDefault(require("./template/typeorm/index"));
let ImsCoreAdminerSetting = class ImsCoreAdminerSetting {
    async designAddon(body) {
        const { name, title, version, author } = body;
        const path = path_1.join(root, 'addons', name);
        if (fs_extra_1.default.existsSync(path)) {
            return {
                code: -1,
                message: '模块已存在'
            };
        }
        else {
            // 检查模块是否已存在
            let addon = await this.addon.findOne({
                name: name
            });
            if (!addon) {
                addon = new ims_model_1.ImsAddonEntity();
            }
            /** 创建模块 */
            fs_extra_1.default.ensureDirSync(path);
            fs_extra_1.default.ensureDirSync(path_1.join(path, 'template'));
            fs_extra_1.default.ensureDirSync(path_1.join(path, 'inc'));
            fs_extra_1.default.ensureDirSync(path_1.join(path, 'typeorm'));
            fs_extra_1.default.ensureDirSync(path_1.join(path, 'typeorm', 'entities'));
            fs_extra_1.default.ensureDirSync(path_1.join(path, 'typeorm', 'migrations'));
            fs_extra_1.default.ensureDirSync(path_1.join(path, 'typeorm', 'subscribers'));
            fs_extra_1.default.writeFileSync(path_1.join(path, 'index.ts'), index_1.default(name, title, version));
            fs_extra_1.default.writeFileSync(path_1.join(path, 'template', 'index.ts'), index_2.default(name));
            fs_extra_1.default.writeFileSync(path_1.join(path, 'inc', 'index.ts'), index_3.default(name));
            fs_extra_1.default.writeFileSync(path_1.join(path, 'typeorm/entities', 'index.ts'), index_4.default(name));
            fs_extra_1.default.writeFileSync(path_1.join(path, 'typeorm', 'index.ts'), index_5.default(name));
            /** 模块入库 */
            addon.name = name;
            addon.title = title;
            addon.version = version;
            addon.isLocal = true;
            addon.enable = false;
            addon.entry = path_1.join(path, 'index.ts');
            addon.author = author;
            await this.addon.save(addon);
            return {
                id: addon.id,
                message: '模块创建成功'
            };
        }
    }
    mineAddons() {
        return this.addon.findAndCount({});
    }
};
__decorate([
    ims_core_1.EntityRepository({
        db: 'system',
        target: ims_model_1.ImsAddonEntity
    }),
    __metadata("design:type", Object)
], ImsCoreAdminerSetting.prototype, "addon", void 0);
__decorate([
    ims_core_1.Post(),
    ims_core_1.Role(ims_node_1.verify((user) => {
        return user.role === 'admin';
    })),
    __param(0, ims_core_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImsCoreAdminerSetting.prototype, "designAddon", null);
__decorate([
    ims_core_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImsCoreAdminerSetting.prototype, "mineAddons", null);
ImsCoreAdminerSetting = __decorate([
    ims_core_1.Controller({
        path: '/adminer/addon'
    })
], ImsCoreAdminerSetting);
exports.ImsCoreAdminerSetting = ImsCoreAdminerSetting;
