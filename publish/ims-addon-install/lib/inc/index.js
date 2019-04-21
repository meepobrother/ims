"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const fs = require("fs-extra");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const root = process.cwd();
const ims_model_1 = require("ims-model");
const ims_common_1 = require("ims-common");
const ims_platform_typeorm_1 = require("ims-platform-typeorm");
const ims_node_1 = require("ims-node");
let ImsIndex = class ImsIndex {
    constructor() {
        this.lockFile = path_1.join(root, 'config/config.json');
    }
    async setDatabase(body) {
        const { username, host, port, password } = body;
        try {
            const connection = await typeorm_1.createConnection({
                type: 'mysql',
                host,
                username,
                password,
                port,
                name: 'setDatabse',
                entities: [],
                subscribers: [],
                migrations: []
            });
            const system = 'ims_system';
            const addons = 'ims_addons';
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${system} default charset utf8 COLLATE utf8_general_ci`);
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${addons} default charset utf8 COLLATE utf8_general_ci`);
            await connection.close();
            fs.writeFileSync(this.lockFile, JSON.stringify({
                system,
                addons,
                p2p: "/ip4/0.0.0.0/tcp/4200",
                api: "/ip4/0.0.0.0/tcp/4201",
                list: [],
                admin: [],
                memcached: [],
                installed: false,
                db: {
                    username,
                    host,
                    port,
                    password
                }
            }, null, 2));
            return {
                code: 0,
                message: '数据库配置成功'
            };
        }
        catch (e) {
            return {
                code: -1,
                message: e.message
            };
        }
    }
    async setUser(body) {
        try {
            const manager = typeorm_1.getConnectionManager();
            const config = require(this.lockFile);
            if (!manager.has(config.system)) {
                const model = ims_common_1.visitor.visitType(ims_model_1.ImsModel);
                await ims_platform_typeorm_1.parseSystem(model, config);
            }
            const connection = typeorm_1.getConnection(config.system);
            const userRepository = connection.getRepository(ims_model_1.ImsUserEntity);
            const { username, password } = body;
            let user = await userRepository.findOne({
                username: username
            });
            if (!user) {
                const user = new ims_model_1.ImsUserEntity();
                user.username = username;
                user.token = ims_node_1.random(8);
                user.password = ims_node_1.cryptoPassword(password, user.token);
                await userRepository.save(user);
            }
            config.admin = [user.id];
            config.installed = true;
            fs.writeFileSync(this.lockFile, JSON.stringify(config, null, 2));
            return {
                code: 0,
                message: '设置用户成功'
            };
        }
        catch (e) {
            return {
                code: -1,
                message: e.message
            };
        }
    }
    async restart() {
        // rmrf(join(root, 'config/config.json'))
        ims_node_1.execSync(`pm2 restart all`);
        return {
            code: 0,
            message: '重启成功'
        };
    }
    async successRestart(id) {
        return {
            code: 0,
            message: '启动成功',
            data: id
        };
    }
};
__decorate([
    ims_core_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImsIndex.prototype, "setDatabase", null);
__decorate([
    ims_core_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImsIndex.prototype, "setUser", null);
__decorate([
    ims_core_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImsIndex.prototype, "restart", null);
__decorate([
    ims_core_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImsIndex.prototype, "successRestart", null);
ImsIndex = __decorate([
    ims_core_1.Controller({
        path: '/install'
    })
], ImsIndex);
exports.ImsIndex = ImsIndex;
