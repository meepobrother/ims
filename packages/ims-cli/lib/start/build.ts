import { App } from 'ims-core'
import { createAdmin } from 'ims-webpack-admin';
import { createMobile } from 'ims-webpack-mobile';
import { ImsWebpacks } from './webpack'
import { join } from 'path';
import multiaddr from 'multiaddr';
import fs from 'fs-extra';
import { ImsAdminer } from 'ims-adminer/addon';
import { ImsCloud } from 'ims-cloud';
import { ImsWebsite } from 'ims-website';
import { ImsInstall } from 'ims-install';
import { ImsAddonEntity, ImsModel } from 'ims-model'
import { visitor, IConfig, setConfig } from 'ims-common';
import { parseSystem, parseAddons } from 'ims-platform-typeorm'
import { getConnection } from 'typeorm'
const root = process.cwd();
export class ImsStartApp { }
export async function bootstrap(dev: boolean) {
    const addons = [];
    const configPath = join(root, 'config/config.json');
    const addr = multiaddr('/ip4/0.0.0.0/tcp/4200')
    let addressOptions = addr.toOptions();
    if (fs.existsSync(configPath)) {
        const model = visitor.visitType(ImsModel);
        const config: IConfig = require(join(root, 'config/config.json'));
        setConfig(config);
        const addr = multiaddr(config.api)
        addressOptions = addr.toOptions();
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
            addons.push(ImsWebsite);
            await parseAddons(addons, config);
        } catch (e) { }
    } else {
        addons.push(ImsInstall);
    }
    App({
        addons: addons,
        dev: dev
    })(ImsStartApp);
    const appContext = visitor.visitType(ImsStartApp);
    createAdmin(appContext);
    createMobile(appContext);
    const pack = new ImsWebpacks(visitor.visitType(ImsStartApp), dev);
    pack.run();
}
bootstrap(true);