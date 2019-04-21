"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const path_1 = require("path");
const multiaddr_1 = __importDefault(require("multiaddr"));
const root = process.cwd();
const ims_builder_taro_1 = require("ims-builder-taro");
const ims_hapi_1 = __importDefault(require("ims-hapi"));
const inert_1 = __importDefault(require("inert"));
const ims_common_1 = require("ims-common");
const chokidar_1 = __importDefault(require("chokidar"));
const typeorm_1 = require("typeorm");
const http_1 = require("./transform/http");
const template_1 = require("./transform/template");
const ims_core_1 = require("ims-core");
const ims_model_1 = require("ims-model");
const ims_webpack_admin_1 = require("ims-webpack-admin");
const ws_1 = __importDefault(require("ws"));
const ims_p2p_1 = require("ims-p2p");
const socket_1 = require("./transform/socket");
const fs_extra_1 = __importDefault(require("fs-extra"));
const ims_platform_typeorm_1 = require("ims-platform-typeorm");
let socketSet = new Set();
const configPath = path_1.join(root, 'config/config.json');
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const role_1 = require("./transform/role");
class ImsPlatformHapi {
    constructor(options = {
        port: 4201,
        host: '0.0.0.0',
        addons: []
    }) {
        this.options = options;
        this.installed = false;
    }
    // 临时添加模块
    addAddon(name) {
        this.options.addons.push(name);
    }
    async init(test = false) {
        this.connectionManager = typeorm_1.getConnectionManager();
        if (fs_extra_1.default.existsSync(configPath)) {
            this.config = require(path_1.join(root, 'config/config.json'));
            ims_common_1.setConfig(this.config);
            if (this.config.installed) {
                this.installed = true;
                const model = ims_common_1.visitor.visitType(ims_model_1.ImsModel);
                await ims_platform_typeorm_1.parseSystem(model, this.config);
                this.options.addons.push(require.resolve('ims-addon-adminer'));
                const connection = this.connectionManager.get(this.config.system);
                const addonRepository = connection.getRepository(ims_model_1.ImsAddonEntity);
                const allAddon = await addonRepository.find({
                    enable: true
                });
                allAddon.map(addon => {
                    this.options.addons.push(addon.entry);
                });
                const addr = multiaddr_1.default(this.config.api);
                let addressOptions = addr.toOptions();
                this.options.port = addressOptions.port;
                this.options.host = addressOptions.host;
                await ims_platform_typeorm_1.parseAddons(this.options.addons, this.config);
            }
            else {
                this.options.addons = [require.resolve('ims-addon-install')];
            }
        }
        else {
            this.options.addons = [require.resolve('ims-addon-install')];
        }
        // hapi server
        this.server = ims_hapi_1.default({
            port: this.options.port,
            host: this.options.host,
            routes: {
                files: {
                    relativeTo: path_1.join(root, 'attachment')
                }
            }
        });
        // 静态服务器
        await this.server.register(inert_1.default);
        // 登录
        await this.server.register(require('hapi-auth-jwt2'));
        const validate = async function (decoded, request) {
            console.log({
                decoded, request
            });
            request.user = decoded;
        };
        await this.server.auth.strategy('jwt', 'jwt', {
            key: this.config.key,
            validate: validate,
            verifyOptions: {
                algorithms: ['HS256']
            }
        });
        this.server.auth.default('jwt');
        // websocket server
        this.ws = new ws_1.default.Server({
            server: this.server.listener
        });
        // typeorm connection manager
        // 如果test=false并且this.isntalled =true则启动p2p服务
        if (this.installed && !test) {
            // libp2p
            this.libp2p = await ims_p2p_1.bootstrap();
        }
        // 异常监控
        process.on('unhandledRejection', (err) => {
            console.log(err);
        });
        // 启动
        await this.server.start();
        console.log('Server running at:', this.server.info.uri);
        // 404
        this.server.ext('onPreResponse', (request, h) => {
            const response = request.response;
            if (response.isBoom && response.output.statusCode === 404) {
                return h.redirect('/error/404');
            }
            return h.continue;
        });
        this.registerStatic();
        this.options.addons.map(src => {
            const addon = require(src).default;
            const context = ims_common_1.visitor.visitType(addon);
            context.set('sourceRoot', src);
            role_1.transformRole(context);
            ims_p2p_1.transform(context, this.libp2p);
            socket_1.transformWs(context, this.ws);
            http_1.transformHttp(context, this.server);
            template_1.transformTemplate(context, this.server);
            // 穿件移动模板
            this.buildMobile(context);
            this.registerSocket();
            this.watch(context);
        });
        ims_webpack_admin_1.createAdmin(this.options.addons);
    }
    buildMobile(context) {
        ims_builder_taro_1.buildAppPages(context).then(res => {
            console.log(res);
        });
        ims_builder_taro_1.buildTaro('weapp', false);
    }
    /** 静态资源 模板 */
    registerStatic() {
        this.server.route({
            method: 'GET',
            path: '/attachment/{param*}',
            options: { auth: false },
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
    watch(context) {
        const addonAst = context.getClass(ims_core_1.AddonMetadataKey);
        const sourceRoot = context.get('sourceRoot');
        if (!!addonAst.ast.metadataDef.dev) {
            // 模板变化
            const templateSubject = new rxjs_1.Subject();
            const incSubject = new rxjs_1.Subject();
            templateSubject.pipe(operators_1.debounceTime(500), operators_1.skip(1)).subscribe((src) => {
                delete require.cache[sourceRoot];
                const addon = require(src).default;
                const context = ims_common_1.visitor.visitType(addon);
                template_1.transformTemplate(context, this.server);
                ims_webpack_admin_1.createAdmin(this.options.addons);
                this.buildMobile(context);
            });
            incSubject.pipe(operators_1.debounceTime(500), operators_1.skip(1)).subscribe((src) => {
                delete require.cache[sourceRoot];
                const addon = require(src).default;
                const context = ims_common_1.visitor.visitType(addon);
                http_1.transformHttp(context, this.server);
            });
            chokidar_1.default.watch([
                path_1.join(addonAst.sourceRoot, 'template/**/*.ts'),
                path_1.join(addonAst.sourceRoot, 'template/**/*.js')
            ], { ignored: [/.*\.d\.ts/] }).on('all', (op, file) => {
                delete require.cache[file];
                templateSubject.next(sourceRoot);
                console.log(`${op} ${file}`);
            });
            chokidar_1.default.watch([
                path_1.join(addonAst.sourceRoot, 'inc/**/*.ts'),
                path_1.join(addonAst.sourceRoot, 'inc/**/*.js')
            ], { ignored: [/.*\.d\.ts/] }).on('all', (op, file) => {
                delete require.cache[file];
                incSubject.next(sourceRoot);
                console.log(`${op} ${file}`);
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
            });
            // 接收消息
            ws.on('message', (data) => {
                // 收到消息
                const { type, payload } = JSON.parse(data.toString());
                socket_1.handlerMap.get(type)(ws, req, payload);
            });
            // 错误
            ws.on('error', (err) => {
                socketSet.delete(ws);
            });
            // 关闭
            ws.on('close', (code, reason) => {
                ws.send({
                    type: 'close',
                    payload: {
                        code,
                        reason
                    }
                }, (err) => {
                    // error
                });
                socketSet.delete(ws);
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
exports.ImsPlatformHapi = ImsPlatformHapi;
