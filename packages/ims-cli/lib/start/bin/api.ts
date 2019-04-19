/// <reference types="node" />
import { getConnectionManager } from 'typeorm';
import { ImsAddonEntity, ImsModel } from 'ims-model'
import { visitor, IConfig, setConfig } from 'ims-common';
import { parseSystem } from 'ims-platform-typeorm'
import { join } from 'path';
import fs = require('fs-extra');
import multiaddr from 'multiaddr'
import { ImsPlatformHapi } from 'ims-platform-hapi'
export async function bootstrap(root: string) {
    const addons: string[] = [];
    const configPath = join(root, 'config/config.json');
    const addr = multiaddr('/ip4/0.0.0.0/tcp/4201')
    let addressOptions = addr.toOptions();
    if (fs.existsSync(configPath)) {
        const model = visitor.visitType(ImsModel);
        const config: IConfig = require(join(root, 'config/config.json'));
        setConfig(config);
        const addr = multiaddr(config.api)
        addressOptions = addr.toOptions();
        if (config.installed) {
            try {
                await parseSystem(model, config);
                const manager = getConnectionManager();
                const connection = manager.get(config.system)
                const addonRepository = connection.getRepository(ImsAddonEntity);
                const allAddon = await addonRepository.find({
                    enable: true
                });
                allAddon.map(addon => {
                    addons.push(addon.entry);
                });
                addons.push(require.resolve('ims-addon-adminer'));
                // 服务启动
                // await parseAddons(addons, config);
            } catch (e) {
                console.log(e.message)
                console.log(e.stack)
            }
        } else {
            addons.push(require.resolve('ims-addon-install'));
        }
    } else {
        addons.push(require.resolve('ims-addon-install'));
    }
    const hapi = new ImsPlatformHapi({
        port: addressOptions.port,
        host: addressOptions.host,
        addons: addons
    });
    await hapi.init();
}
bootstrap(process.cwd());
