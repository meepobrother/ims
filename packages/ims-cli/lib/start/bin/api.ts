/// <reference types="node" />
import { getConnectionManager } from 'typeorm';
import express = require('express');
import { ImsAddonEntity, ImsModel } from 'ims-model'
import { visitor, IConfig, setConfig } from 'ims-common';
import { parseSystem, parseAddons } from 'ims-platform-typeorm'
import { join } from 'path';
import fs = require('fs-extra');
import { parseTemplate } from '../parseTemplate'
import { createServer } from 'http'
import { Server } from 'ws';
import multer = require('multer');
import bodyparser = require('body-parser');
import { ImsCookie } from 'ims-cookie';
import session = require('express-session');
/**
 * 开发者模式 监听应用文件变化 并自动重新加载应用
 */
declare global {
    namespace Express {
        interface Request {
            imsCookie: ImsCookie;
        }
        interface Response { }
        interface Application { }
    }
}

import ImsInstall from 'ims-install';
import ImsCoreAdminer from 'ims-core-adminer';

import { bootstrap as p2pBotstrap } from 'ims-p2p'
import multiaddr from 'multiaddr'
import { transform, watchAddon } from 'ims-node'
const file = multer();
import proxy = require('http-proxy-middleware');

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
    app.use((req, res, next) => {
        const cookie = new ImsCookie(req.headers.cookie || '');
        cookie.addChangeListener((change) => {
            if (!res.cookie || res.headersSent) {
                return;
            }
            if (change.value === undefined) {
                res.clearCookie(change.name, change.options);
            } else {
                const expressOpt = (<any>Object).assign({}, change.options);
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
    app.use('/addons', proxy({
        target: '',
        changeOrigin: true
    }));
    const addons = [];
    const configPath = join(root, 'config/config.json');
    const addr = multiaddr('/ip4/0.0.0.0/tcp/4201')
    let addressOptions = addr.toOptions();
    let installed = false;
    if (fs.existsSync(configPath)) {
        installed = true;
        const model = visitor.visitType(ImsModel);
        const config: IConfig = require(join(root, 'config/config.json'));
        setConfig(config);
        const addr = multiaddr(config.api)
        addressOptions = addr.toOptions();
        try {
            await parseSystem(model, config);
            const manager = getConnectionManager();
            const connection = manager.get(config.system)
            const addonRepository = connection.getRepository(ImsAddonEntity);
            const allAddon = await addonRepository.find({
                enable: true
            });
            allAddon.map(addon => {
                const targt = require(addon.entry).default;
                addons.push(targt);
            });
            addons.push(ImsCoreAdminer);
            // 服务启动
            await parseAddons(addons, config);
        } catch (e) {
            console.log(e.message)
            console.log(e.stack)
        }
    } else {
        addons.push(ImsInstall);
    }
    let node: any;
    if (installed) {
        node = await p2pBotstrap();
    }
    // 解析template
    parseTemplate(addons, app, root);
    /** 安装 */
    const server = createServer(app);
    const ws = new Server({ server });
    transform(addons, {
        app: app,
        connectionManager: getConnectionManager(),
        server: ws,
        libp2p: node
    });
    if (!installed) {
        // 如果没有安装跳转到安装页面
        app.get('*', (req, res, next) => {
            res.redirect('/ims-install')
        });
    }
    return new Promise((resolve, reject) => {
        server.listen(addressOptions.port, addressOptions.host, () => {
            console.log(`api start at http://${addressOptions.host}:${addressOptions.port}`)
            if (dev) addons.map(addon => watchAddon(addon))
            resolve();
        });
    });
}
