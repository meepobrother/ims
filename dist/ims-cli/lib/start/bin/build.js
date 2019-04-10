"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const ims_webpack_admin_1 = require("ims-webpack-admin");
const ims_webpack_mobile_1 = require("ims-webpack-mobile");
const webpack_1 = require("../webpack");
const path_1 = require("path");
const fs_extra_1 = __importDefault(require("fs-extra"));
const addon_1 = require("ims-adminer/addon");
const ims_cloud_1 = require("ims-cloud");
const ims_website_1 = require("ims-website");
const ims_install_1 = require("ims-install");
const ims_model_1 = require("ims-model");
const ims_common_1 = require("ims-common");
const ims_platform_typeorm_1 = require("ims-platform-typeorm");
const typeorm_1 = require("typeorm");
const root = process.cwd();
class ImsStartApp {
}
exports.ImsStartApp = ImsStartApp;
function bootstrap(dev) {
    return __awaiter(this, void 0, void 0, function* () {
        const addons = [];
        const configPath = path_1.join(root, 'config/config.json');
        if (fs_extra_1.default.existsSync(configPath)) {
            const model = ims_common_1.visitor.visitType(ims_model_1.ImsModel);
            const config = require(path_1.join(root, 'config/config.json'));
            ims_common_1.setConfig(config);
            try {
                yield ims_platform_typeorm_1.parseSystem(model, config);
                const connection = typeorm_1.getConnection(config.system);
                const addonRepository = connection.getRepository(ims_model_1.ImsAddonEntity);
                const allAddon = yield addonRepository.find({
                    enable: true
                });
                allAddon.map(addon => {
                    addons.push(require(addon.entry).default);
                });
                addons.push(addon_1.ImsAdminer);
                addons.push(ims_cloud_1.ImsCloud);
                addons.push(ims_website_1.ImsWebsite);
                yield ims_platform_typeorm_1.parseAddons(addons, config);
            }
            catch (e) { }
        }
        else {
            addons.push(ims_install_1.ImsInstall);
        }
        ims_core_1.App({
            addons: addons,
            dev: dev
        })(ImsStartApp);
        const appContext = ims_common_1.visitor.visitType(ImsStartApp);
        ims_webpack_admin_1.createAdmin(appContext);
        ims_webpack_mobile_1.createMobile(appContext);
        const pack = new webpack_1.ImsWebpacks(ims_common_1.visitor.visitType(ImsStartApp), dev);
        pack.run();
    });
}
exports.bootstrap = bootstrap;
bootstrap(true);
