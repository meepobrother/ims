import "reflect-metadata";
import { join } from 'path';
const root = process.cwd();
import { Server, Request, ResponseToolkit } from 'hapi';
import createHapi from 'ims-hapi'
import * as Boom from 'boom';
import inert from 'inert';
import { visitor, IConfig } from 'ims-common';
import chokidar from 'chokidar';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import { transformHttp } from './transform/http'
import { transformTemplate } from './transform/template'
import { AddonMetadataKey, AddonAst } from 'ims-core';

export interface ImsPlatformHapiOptions {
    port?: number;
    host?: string;
    addons?: string[];
}
import WebSocket from 'ws';
import { bootstrap, transform as transformP2p } from 'ims-p2p'
import { transformWs, handlerMap } from './transform/socket';
import Libp2p from 'libp2p';
import { TypeContext } from 'ims-decorator';
import fs from 'fs-extra';
let socketSet = new Set();
const configPath = join(root, 'config/config.json');

export class ImsPlatformHapi {
    server: Server;
    ws: WebSocket.Server;
    libp2p: Libp2p;
    connectionManager: ConnectionManager;
    installed: boolean = false;
    config: IConfig;
    constructor(public options: ImsPlatformHapiOptions) {
        if (fs.existsSync(configPath)) {
            this.config = require(join(root, 'config/config.json'));
            if (this.config.installed) {
                this.installed = true;
            }
        }
    }

    async init() {
        // hapi server
        this.server = createHapi({
            port: this.options.port,
            host: this.options.host,
            routes: {
                files: {
                    relativeTo: join(root, 'attachment')
                }
            }
        });
        // 静态服务器
        await this.server.register(inert)
        // websocket server
        this.ws = new WebSocket.Server({
            server: this.server.listener
        });
        // typeorm connection manager
        this.connectionManager = getConnectionManager();
        if (this.installed) {
            // libp2p
            this.libp2p = await bootstrap();
        }
        // 异常监控
        process.on('unhandledRejection', (err) => {
            console.log(err);
        });
        // 启动
        await this.server.start();
        console.log('Server running at:', this.server.info.uri);
        // 404
        this.server.ext('onPreResponse', (request: Request, h: ResponseToolkit) => {
            const response = request.response as Boom;
            if (response.isBoom && response.output.statusCode === 404) {
                return h.redirect('/error/404')
            }
            return h.continue;
        });
        this.registerStatic();
        this.options.addons.map(src => {
            const addon = require(src).default;
            const context = visitor.visitType(addon);
            context.set('sourceRoot', src)
            transformP2p(context, this.libp2p);
            transformWs(context, this.ws);
            transformHttp(context, this.server)
            transformTemplate(context, this.server)
            this.registerSocket();
            this.watch(context);
        });
    }
    /** 静态资源 模板 */
    registerStatic() {
        this.server.route({
            method: 'GET',
            path: '/attachment/{param*}',
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true,
                    index: true,
                }
            }
        });
    }
    /** 开发者模式监听 */
    watch(context: TypeContext) {
        const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
        const sourceRoot = context.get('sourceRoot');
        if (!!addonAst.ast.metadataDef.dev) {
            // 模板变化
            chokidar.watch(
                [
                    join(addonAst.sourceRoot, 'template/**/*.ts'),
                    join(addonAst.sourceRoot, 'template/**/*.js')
                ]
            ).on('all', (op, file) => {
                delete require.cache[file];
                delete require.cache[sourceRoot];
                const addon = require(sourceRoot).default;
                const context = visitor.visitType(addon);
                transformTemplate(context, this.server);
            });
            chokidar.watch(
                join(addonAst.sourceRoot, 'inc/**/*.ts')
            ).on('all', (op, file) => {
                delete require.cache[file];
                delete require.cache[sourceRoot];
                const addon = require(sourceRoot).default;
                const context = visitor.visitType(addon);
                transformHttp(context, this.server);
            });
        }
    }

    /** 注册websocket */
    registerSocket() {
        this.ws.removeAllListeners('connection');
        this.ws.removeAllListeners('error');
        this.ws.removeAllListeners('listening');
        this.ws.removeAllListeners('headers');
        this.ws.on('connection', (ws, req) => {
            // 建立连接
            socketSet.add(ws);
            ws.on('open', () => {
                // open
            })
            // 接收消息
            ws.on('message', (data) => {
                // 收到消息
                const { type, payload } = JSON.parse(data.toString());
                handlerMap.get(type)(ws, req, payload);
            });
            // 错误
            ws.on('error', (err) => {
                socketSet.delete(ws);
            });
            // 关闭
            ws.on('close', (code: number, reason: string) => {
                ws.send({
                    type: 'close',
                    payload: {
                        code,
                        reason
                    }
                }, (err) => {
                    // error
                });
                socketSet.delete(ws)
            });
        });
        this.ws.on('error', (err) => {
            // error
        });
        this.ws.on('listening', () => {
            // listening
        });
        // todo
        this.ws.on('headers', (headers, req) => {
            // 检查
        });
    }
}
// const hapi = new ImsPlatformHapi({
//     dev: true,
//     port: 3000,
//     host: 'localhost',
//     addons: [
//         // require.resolve('ims-addon-install'),
//         join(root, 'packages/ims-addon-adminer/lib/index.ts')
//     ]
// });
// hapi.init();
