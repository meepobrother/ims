import { createNginxConfig, NginxProps } from './createNginxConfig';
import { execSync } from '../util';
import fs from 'fs-extra';
import { join } from 'path';
import chokidar from 'chokidar';
import { getConnectionManager } from 'typeorm';
import { IConfig, visitor, setConfig } from 'ims-common';
const root = process.cwd();
const nginxConfigD = join(root, 'config/nginx/conf.d');
import { ImsServer, ImsModel } from 'ims-model'
import { parseSystem } from 'ims-platform-typeorm'
export class Nginx {
    createNginxConfig(props: NginxProps[]) {
        return createNginxConfig(props);
    }
    /** 监听文件变化 */
    nginxWatch() {
        chokidar.watch(nginxConfigD).on('all', async () => {
            await execSync(`docker-compose up -d`)
        });
    }
    async bootstrap() {
        const configPath = join(root, 'config/config.json');
        const model = visitor.visitType(ImsModel);
        if (fs.existsSync(configPath)) {
            const manager = getConnectionManager();
            const config: IConfig = require(join(root, 'config/config.json'));
            setConfig(config)
            if (!manager.has(config.system)) {
                await parseSystem(model, config);
            }
            if (manager.has(config.system)) {
                const connect = manager.get(config.system);
                const server = connect.getRepository(ImsServer);
                const props = await server.find();
                const configContent = createNginxConfig(props)
                fs.writeFileSync(join(nginxConfigD, 'default.conf'), configContent)
            }
        }
    }
}
export const nginx = new Nginx();