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
            if (config.installed) {
                const connection = typeorm_1.getConnection(config.system);
                const addonRepository = connection.getRepository(ims_model_1.ImsAddonEntity);
                const allAddon = await addonRepository.find({
                    enable: true
                });
                allAddon.map(addon => {
                    addons.push(require(addon.entry).default);
                });
                addons.push(require.resolve('ims-addon-adminer'));
            }
            else {
                addons.push(require.resolve('ims-addon-install'));
            }
        }
        catch (e) {
            console.log(`error`, e.message);
        }
    }
    else {
        addons.push(require.resolve('ims-addon-install'));
    }
    const pack = new webpack_1.ImsWebpacks(addons, dev);
    pack.run();
}
exports.bootstrap = bootstrap;
