import { Controller, Post, Body, On } from 'ims-core';
import fs from 'fs-extra'
import { join } from 'path';
import { createConnection, getConnection, getConnectionManager } from 'typeorm';
const root = process.cwd();
import { ImsModel, ImsUserEntity } from 'ims-model'
import { visitor, IConfig } from 'ims-common';
import { parseSystem } from 'ims-platform-typeorm'
@Controller({
    path: '/',
    sourceRoot: __filename
})
export class ImsIndex {
    lockFile: string = join(root, 'config/config.json')
    @Post()
    async setDatabase(@Body() body: any) {
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
                port: 8080,
                admin: [],
                db: {
                    username,
                    host,
                    port,
                    password
                }
            }, null, 2));
            return {
                username, host, port, password
            }
        } catch (e) {
            return {
                code: -1,
                message: e.message,
                data: {
                    username, host, port, password
                }
            }
        }
    }

    @Post()
    async setUser(@Body() body: any) {
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
                user.token = 'abcd';
                user.password = password;
                await userRepository.save(user);
            }
            config.admin = [user.id];
            fs.writeFileSync(this.lockFile, JSON.stringify(config, null, 2));
            return {
                uid: user.id
            }
        } catch (e) {
            return {
                code: -1,
                message: e.message
            }
        }
    }

    /**
     * 安装应用
     */
    @On('install')
    install() { 
        
    }
}
