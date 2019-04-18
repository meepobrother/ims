import { Controller, Post, Get } from 'ims-core';
import fs = require('fs-extra')
import { join } from 'path';
import { createConnection, getConnection, getConnectionManager } from 'typeorm';
const root = process.cwd();
import { ImsModel, ImsUserEntity } from 'ims-model'
import { visitor, IConfig } from 'ims-common';
import { parseSystem } from 'ims-platform-typeorm'
import { random, cryptoPassword, execSync } from 'ims-node';
export interface ISetDatabaseOptions {
    username: string;
    host: string;
    port: number;
    password: string;
}
export interface ISetDatabaseResult<T = any> {
    code: number;
    message: string;
    data?: T;
}
export interface ISetUserOptions {
    username: string;
    password: string;
}
@Controller({
    path: '/install'
})
export class ImsIndex {
    lockFile: string = join(root, 'config/config.json')
    @Post()
    async setDatabase(body: ISetDatabaseOptions): Promise<ISetDatabaseResult> {
        const { username, host, port, password } = body;
        try {
            const connection = await createConnection({
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
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${system} default charset utf8 COLLATE utf8_general_ci`)
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${addons} default charset utf8 COLLATE utf8_general_ci`)
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
            }
        } catch (e) {
            return {
                code: -1,
                message: e.message
            }
        }
    }

    @Post()
    async setUser(body: ISetUserOptions): Promise<ISetDatabaseResult> {
        try {
            const manager = getConnectionManager();
            const config: IConfig = require(this.lockFile);
            if (!manager.has(config.system)) {
                const model = visitor.visitType(ImsModel);
                await parseSystem(model, config);
            }
            const connection = getConnection(config.system);
            const userRepository = connection.getRepository(ImsUserEntity)
            const { username, password } = body;
            let user = await userRepository.findOne({
                username: username
            });
            if (!user) {
                const user = new ImsUserEntity();
                user.username = username;
                user.token = random(8);
                user.password = cryptoPassword(password, user.token);
                await userRepository.save(user);
            }
            config.admin = [user.id];
            config.installed = true;
            fs.writeFileSync(this.lockFile, JSON.stringify(config, null, 2));
            return {
                code: 0,
                message: '设置用户成功'
            }
        } catch (e) {
            return {
                code: -1,
                message: e.message
            }
        }
    }

    @Post()
    async restart(): Promise<ISetDatabaseResult> {
        // rmrf(join(root, 'config/config.json'))
        execSync(`pm2 restart all`);
        return {
            code: 0,
            message: '重启成功'
        }
    }

    @Get()
    async successRestart(): Promise<ISetDatabaseResult> {
        return {
            code: 0,
            message: '启动成功'
        }
    }
}
