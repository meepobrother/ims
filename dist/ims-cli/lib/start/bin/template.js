"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("../webpack");
const path_1 = require("path");
const fs_extra_1 = __importDefault(require("fs-extra"));
const ims_model_1 = require("ims-model");
const ims_common_1 = require("ims-common");
const ims_platform_typeorm_1 = require("ims-platform-typeorm");
const typeorm_1 = require("typeorm");
const ims_core_adminer_1 = __importDefault(require("ims-core-adminer"));
const ims_install_1 = __importDefault(require("ims-install"));
const root = process.cwd();
class ImsStartApp {
}
exports.ImsStartApp = ImsStartApp;
async function bootstrap(dev) {
    const addons = [];
    const configPath = path_1.join(root, 'config/config.json');
    if (fs_extra_1.default.existsSync(configPath)) {
        const model = ims_common_1.visitor.visitType(ims_model_1.ImsModel);
        const config = require(path_1.join(root, 'config/config.json'));
        ims_common_1.setConfig(config);
        try {
            await ims_platform_typeorm_1.parseSystem(model, config);
        }
        catch (e) { }
        try {
            const connection = typeorm_1.getConnection(config.system);
            const addonRepository = connection.getRepository(ims_model_1.ImsAddonEntity);
            const allAddon = await addonRepository.find({
                enable: true
            });
            allAddon.map(addon => {
                addons.push(require(addon.entry).default);
            });
            addons.push(ims_core_adminer_1.default);
        }
        catch (e) {
            console.log(`error`, e.message);
        }
    }
    else {
        // 安装模块
        addons.push(ims_install_1.default);
    }
    const pack = new webpack_1.ImsWebpacks(addons, dev);
    pack.run();
}
exports.bootstrap = bootstrap;
