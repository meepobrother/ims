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
const typeorm_1 = require("typeorm");
const express = require("express");
const ims_model_1 = require("ims-model");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const ims_platform_typeorm_1 = require("ims-platform-typeorm");
const path_1 = require("path");
const fs = require("fs-extra");
const parseRouter_1 = require("./parseRouter");
const parseTemplate_1 = require("./parseTemplate");
const http_1 = require("http");
const ws_1 = require("ws");
const parseWebSocket_1 = require("./parseWebSocket");
const multer = require("multer");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const addon_1 = require("ims-adminer/addon");
const ims_cloud_1 = require("ims-cloud");
const ims_website_1 = require("ims-website");
const ims_install_1 = require("ims-install");
const ims_p2p_1 = require("ims-p2p");
const parseP2p_1 = require("./parseP2p");
const multiaddr_1 = __importDefault(require("multiaddr"));
const file = multer();
class ImsStartApp {
}
exports.ImsStartApp = ImsStartApp;
function bootstrap(root, dev) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        app.use(file.any());
        app.use(express.static(path_1.join(root, 'template')));
        app.use(express.static(path_1.join(root, 'attachment')));
        const jsonParser = bodyparser.json();
        const textParser = bodyparser.text();
        const rawParser = bodyparser.raw();
        const urlencodedParser = bodyparser.urlencoded({ extended: true });
        app.use(jsonParser);
        app.use(urlencodedParser);
        app.use(textParser);
        app.use(rawParser);
        app.use(cookieParser());
        app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 3
            }
        }));
        const addons = [];
        const configPath = path_1.join(root, 'config/config.json');
        const addr = multiaddr_1.default('/ip4/0.0.0.0/tcp/4200');
        let addressOptions = addr.toOptions();
        if (fs.existsSync(configPath)) {
            const model = ims_common_1.visitor.visitType(ims_model_1.ImsModel);
            const config = require(path_1.join(root, 'config/config.json'));
            ims_common_1.setConfig(config);
            const addr = multiaddr_1.default(config.api);
            addressOptions = addr.toOptions();
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
            app.get('/', (req, res, next) => {
                res.redirect('/ims-install');
            });
        }
        const node = yield ims_p2p_1.bootstrap();
        // 解析router
        parseRouter_1.parseRouter(addons, app, node);
        // 解析template
        parseTemplate_1.parseTemplate(addons, app, root);
        /** 安装 */
        ims_core_1.App({
            addons: addons,
            dev: dev
        })(ImsStartApp);
        const appContext = ims_common_1.visitor.visitType(ImsStartApp);
        // createAdmin(appContext);
        // createMobile(appContext);
        // const pack = new ImsWebpacks(visitor.visitType(ImsStartApp), dev);
        // pack.run();
        const server = http_1.createServer(app);
        const ws = new ws_1.Server({ server });
        ws.on('connection', (socket) => {
            parseWebSocket_1.parseWebSocket(appContext, socket, ws);
        });
        parseP2p_1.parseP2p(appContext, node);
        return new Promise((resolve, reject) => {
            server.listen(addressOptions.port, addressOptions.host, () => {
                console.log(`api start at http://${addressOptions.host}:${addressOptions.port}`);
                resolve();
            });
        });
    });
}
exports.bootstrap = bootstrap;
