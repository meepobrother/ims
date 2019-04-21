"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createNginxConfig_1 = require("./createNginxConfig");
const util_1 = require("../util");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const chokidar_1 = __importDefault(require("chokidar"));
const typeorm_1 = require("typeorm");
const ims_common_1 = require("ims-common");
const root = process.cwd();
const nginxConfigD = path_1.join(root, 'config/nginx/conf.d');
const ims_model_1 = require("ims-model");
const ims_platform_typeorm_1 = require("ims-platform-typeorm");
class Nginx {
    createNginxConfig(props) {
        return createNginxConfig_1.createNginxConfig(props);
    }
    /** 监听文件变化 */
    nginxWatch() {
        chokidar_1.default.watch(nginxConfigD).on('all', async () => {
            await util_1.execSync(`docker-compose up -d`);
        });
    }
    async bootstrap() {
        const configPath = path_1.join(root, 'config/config.json');
        const model = ims_common_1.visitor.visitType(ims_model_1.ImsModel);
        if (fs_extra_1.default.existsSync(configPath)) {
            const manager = typeorm_1.getConnectionManager();
            const config = require(path_1.join(root, 'config/config.json'));
            ims_common_1.setConfig(config);
            if (!manager.has(config.system)) {
                await ims_platform_typeorm_1.parseSystem(model, config);
            }
            if (manager.has(config.system)) {
                const connect = manager.get(config.system);
                const server = connect.getRepository(ims_model_1.ImsServer);
                const props = await server.find();
                const configContent = createNginxConfig_1.createNginxConfig(props);
                fs_extra_1.default.writeFileSync(path_1.join(nginxConfigD, 'default.conf'), configContent);
            }
        }
    }
}
exports.Nginx = Nginx;
exports.nginx = new Nginx();
