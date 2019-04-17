"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="node" />
const typeorm_1 = require("typeorm");
const express = require("express");
const ims_model_1 = require("ims-model");
const ims_common_1 = require("ims-common");
const ims_platform_typeorm_1 = require("ims-platform-typeorm");
const path_1 = require("path");
const fs = require("fs-extra");
const parseTemplate_1 = require("../parseTemplate");
const http_1 = require("http");
const ws_1 = require("ws");
const multer = require("multer");
const bodyparser = require("body-parser");
const ims_cookie_1 = require("ims-cookie");
const session = require("express-session");
const ims_addon_install_1 = __importDefault(require("ims-addon-install"));
const ims_addon_adminer_1 = __importDefault(require("ims-addon-adminer"));
const ims_p2p_1 = require("ims-p2p");
const multiaddr_1 = __importDefault(require("multiaddr"));
const ims_node_1 = require("ims-node");
const file = multer();
async function bootstrap(root, dev) {
    const app = express();
    app.use(file.any());
    app.use(express.static(path_1.join(root, 'template')));
    app.use(express.static(path_1.join(root, 'attachment')));
    app.use('/favicon.ico', (req, res, next) => {
        res.end('');
    });
    const jsonParser = bodyparser.json();
    const textParser = bodyparser.text();
    const rawParser = bodyparser.raw();
    const urlencodedParser = bodyparser.urlencoded({ extended: true });
    app.use(jsonParser);
    app.use(urlencodedParser);
    app.use(textParser);
    app.use(rawParser);
    app.use((req, res, next) => {
        const cookie = new ims_cookie_1.ImsCookie(req.headers.cookie || '');
        cookie.addChangeListener((change) => {
            if (!res.cookie || res.headersSent) {
                return;
            }
            if (change.value === undefined) {
                res.clearCookie(change.name, change.options);
            }
            else {
                const expressOpt = Object.assign({}, change.options);
                if (expressOpt.maxAge && change.options && change.options.maxAge) {
                    expressOpt.maxAge = change.options.maxAge * 1000;
                }
                res.cookie(change.name, change.value, expressOpt);
            }
        });
        req.imsCookie = cookie;
        next();
    });
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
    const addr = multiaddr_1.default('/ip4/0.0.0.0/tcp/4201');
    let addressOptions = addr.toOptions();
    let installed = false;
    if (fs.existsSync(configPath)) {
        installed = true;
        const model = ims_common_1.visitor.visitType(ims_model_1.ImsModel);
        const config = require(path_1.join(root, 'config/config.json'));
        ims_common_1.setConfig(config);
        const addr = multiaddr_1.default(config.api);
        addressOptions = addr.toOptions();
        try {
            await ims_platform_typeorm_1.parseSystem(model, config);
            const manager = typeorm_1.getConnectionManager();
            const connection = manager.get(config.system);
            const addonRepository = connection.getRepository(ims_model_1.ImsAddonEntity);
            const allAddon = await addonRepository.find({
                enable: true
            });
            allAddon.map(addon => {
                const targt = require(addon.entry).default;
                addons.push(targt);
            });
            addons.push(ims_addon_adminer_1.default);
            // 服务启动
            await ims_platform_typeorm_1.parseAddons(addons, config);
        }
        catch (e) {
            console.log(e.message);
            console.log(e.stack);
        }
    }
    else {
        addons.push(ims_addon_install_1.default);
    }
    let node;
    if (installed) {
        node = await ims_p2p_1.bootstrap();
    }
    // 解析template
    parseTemplate_1.parseTemplate(addons, app, root);
    /** 安装 */
    const server = http_1.createServer(app);
    const ws = new ws_1.Server({ server });
    ims_node_1.transform(addons, {
        app: app,
        connectionManager: typeorm_1.getConnectionManager(),
        server: ws,
        libp2p: node
    });
    return new Promise((resolve, reject) => {
        server.listen(addressOptions.port, addressOptions.host, () => {
            console.log(`api start at http://${addressOptions.host}:${addressOptions.port}`);
            if (dev)
                addons.map(addon => ims_node_1.watchAddon(addon));
            resolve();
        });
    });
}
exports.bootstrap = bootstrap;
