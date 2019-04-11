import { createAdmin } from 'ims-webpack-admin';
import { createMobile } from 'ims-webpack-mobile';
import { ImsWebpacks } from '../webpack';
import { join } from 'path';
import fs from 'fs-extra';
import { ImsAddonEntity, ImsModel } from 'ims-model'
import { visitor, setConfig } from 'ims-common';
import { parseSystem, parseAddons } from 'ims-platform-typeorm'
import { getConnection } from 'typeorm'
import ImsEditor from 'ims-core-editor';
const root = process.cwd();
export class ImsStartApp { }
export async function bootstrap(dev: boolean) {
    const addons = [];
    const configPath = join(root, 'config/config.json');
    if (fs.existsSync(configPath)) {
        const model = visitor.visitType(ImsModel);
        const config = require(join(root, 'config/config.json'));
        setConfig(config);
        try { 
            await parseSystem(model, config);
        } catch (e) { }
        try {
            const connection = getConnection(config.system)
            const addonRepository = connection.getRepository(ImsAddonEntity);
            const allAddon = await addonRepository.find({
                enable: true
            });
            allAddon.map(addon => {
                addons.push(require(addon.entry).default)
            });
            addons.push(ImsEditor)
            await parseAddons(addons, config);
        } catch (e) {
            console.log(`error`, e.message)
        }
    } else {
        // 安装模块
    }
    createAdmin(addons);
    createMobile(addons);
    const pack = new ImsWebpacks(addons, dev);
    pack.run();
}
