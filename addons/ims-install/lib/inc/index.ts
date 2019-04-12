import { Controller, Post, Body, On } from 'ims-core';
import fs = require('fs-extra')
import { join } from 'path';
import { createConnection, getConnection, getConnectionManager } from 'typeorm';
const root = process.cwd();
import { ImsModel, ImsUserEntity } from 'ims-model'
import { visitor, IConfig } from 'ims-common';
import { parseSystem } from 'ims-platform-typeorm'
import { random, cryptoPassword, execSync, rmrf } from 'ims-node';
@Controller({
    path: '/'
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
                p2p: "/ip4/0.0.0.0/tcp/4200",
                api: "/ip4/0.0.0.0/tcp/4201",
                list: [],
                admin: [],
                memcached: [],
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
                message: e.message
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
                user.token = random(8);
                user.password = cryptoPassword(password, user.token);
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
    @Post()
    async restart() {
        rmrf(join(root, 'config/config.json'))
        await execSync(`pm2 restart all`);
        return {
            msg: '重启成功'
        }
    }
}
