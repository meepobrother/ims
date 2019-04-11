import { getConnection } from 'typeorm';
import express = require('express');
import { ImsAddonEntity, ImsModel } from 'ims-model'
import { visitor, IConfig, setConfig } from 'ims-common';
import { App } from 'ims-core';
import { parseSystem, parseAddons } from 'ims-platform-typeorm'
import { join } from 'path';
import fs = require('fs-extra');
import { parseRouter } from './parseRouter'
import { parseTemplate } from './parseTemplate'
import { createServer } from 'http'
import { Server } from 'ws'
import { parseWebSocket } from './parseWebSocket';
import multer = require('multer');
import bodyparser = require('body-parser');
import cookieParser = require('cookie-parser');
import session = require('express-session');

// import { ImsAdminer } from 'ims-adminer/addon';
// import { ImsCloud } from 'ims-cloud';
// import { ImsWebsite } from 'ims-website';
import { ImsInstall } from 'ims-install';
// import ImsEditor from 'ims-core-editor';
import ImsCoreAdminer from 'ims-core-adminer';

import { bootstrap as p2pBotstrap } from 'ims-p2p'
import { parseP2p } from './parseP2p';
import multiaddr, { Options } from 'multiaddr'
const file = multer();
export class ImsStartApp { }
export async function bootstrap(root: string, dev: boolean) {
    const app = express();
    app.use(file.any());
    app.use(express.static(join(root, 'template')))
    app.use(express.static(join(root, 'attachment')))
    const jsonParser: any = bodyparser.json();
    const textParser: any = bodyparser.text();
    const rawParser: any = bodyparser.raw();
    const urlencodedParser: any = bodyparser.urlencoded({ extended: true });
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
    const configPath = join(root, 'config/config.json');
    const addr = multiaddr('/ip4/0.0.0.0/tcp/4200')
    let addressOptions = addr.toOptions();
    if (fs.existsSync(configPath)) {
        const model = visitor.visitType(ImsModel);
        const config: IConfig = require(join(root, 'config/config.json'));
        setConfig(config);
        const addr = multiaddr(config.api)
        addressOptions = addr.toOptions();
        try {
            await parseSystem(model, config);
            const connection = getConnection(config.system)
            const addonRepository = connection.getRepository(ImsAddonEntity);
            const allAddon = await addonRepository.find({
                enable: true
            });
            allAddon.map(addon => {
                addons.push(require(addon.entry).default)
            });
            // addons.push(ImsAdminer);
            // addons.push(ImsCloud);
            // addons.push(ImsWebsite);
            addons.push(ImsCoreAdminer);
            await parseAddons(addons, config);
        } catch (e) { }
    } else {
        addons.push(ImsInstall);
        app.get('/', (req, res, next) => {
            res.redirect('/ims-install')
        });
    }
    const node = await p2pBotstrap();
    // 解析router
    parseRouter(addons, app, node);
    // 解析template
    parseTemplate(addons, app, root);
    /** 安装 */
    App({
        addons: addons,
        dev: dev
    })(ImsStartApp);
    const appContext = visitor.visitType(ImsStartApp);
    const server = createServer(app);
    const ws = new Server({ server });
    ws.on('connection', (socket) => {
        parseWebSocket(appContext, socket, ws)
    });
    parseP2p(appContext, node);
    return new Promise((resolve, reject) => {
        server.listen(addressOptions.port, addressOptions.host, () => {
            console.log(`api start at http://${addressOptions.host}:${addressOptions.port}`)
            resolve();
        });
    });
}
