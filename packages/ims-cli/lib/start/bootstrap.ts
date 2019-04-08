import { getConnection } from 'typeorm';
import express = require('express');
import { ImsAddonEntity, ImsModel } from 'ims-model'
import { ImsInstall } from 'ims-install'
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
import { ImsWebpacks } from './webpack';
import multer = require('multer');
import bodyparser = require('body-parser');
import cookieParser = require('cookie-parser');
import session = require('express-session');
import { createAdmin } from 'ims-webpack-admin';
import { createMobile } from 'ims-webpack-mobile';
import { ImsAdminer } from 'ims-adminer/addon';
import { ImsCloud } from 'ims-cloud';
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
    try {
        const addons = [];
        const configPath = join(root, 'config/config.json');
        let port = 8080;
        if (fs.existsSync(configPath)) {
            const model = visitor.visitType(ImsModel);
            const config: IConfig = require(join(root, 'config/config.json'));
            setConfig(config);
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
                addons.push(ImsAdminer);
                addons.push(ImsCloud);
                await parseAddons(addons, config);
            } catch (e) { }
            port = config.port;
        } else {
            addons.push(ImsInstall);
            app.get('/', (req, res, next) => {
                res.redirect('/ims-install')
            });
        }
        // 解析router
        parseRouter(addons, app, root);
        // 解析template
        parseTemplate(addons, app, root);
        /** 安装 */
        App({
            addons: addons,
            dev: dev
        })(ImsStartApp);
        const appContext = visitor.visitType(ImsStartApp);
        createAdmin(appContext);
        createMobile(appContext);
        const pack = new ImsWebpacks(visitor.visitType(ImsStartApp), dev);
        pack.run();
        const server = createServer(app);
        const ws = new Server({ server });
        ws.on('connection', (socket) => {
            parseWebSocket(appContext, socket, ws)
        });
        return new Promise((resolve, reject) => {
            server.listen(port, () => {
                resolve();
            });
        });
    } catch (e) {
        console.log(`bootstrap:${e.message}`)
        debugger;
    }
}
