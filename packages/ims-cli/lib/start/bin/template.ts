import { ImsWebpacks } from '../webpack';
import { join } from 'path';
import fs from 'fs-extra';
import { ImsAddonEntity, ImsModel } from 'ims-model'
import { visitor, setConfig, IConfig } from 'ims-common';
import { parseSystem } from 'ims-platform-typeorm'
import { getConnection } from 'typeorm'
import ImsCoreAdminer from 'ims-addon-adminer';
import ImsInstall from 'ims-addon-install';
const root = process.cwd();
export class ImsStartApp { }
export async function bootstrap(dev: boolean) {
    const addons: string[] = [];
    const configPath = join(root, 'config/config.json');
    if (fs.existsSync(configPath)) {
        const model = visitor.visitType(ImsModel);
        const config: IConfig = require(join(root, 'config/config.json'));
        setConfig(config);
        try {
            await parseSystem(model, config);
        } catch (e) { }
        try {
            if (config.installed) {
                const connection = getConnection(config.system)
                const addonRepository = connection.getRepository(ImsAddonEntity);
                const allAddon = await addonRepository.find({
                    enable: true
                });
                allAddon.map(addon => {
                    addons.push(require(addon.entry).default)
                });
                addons.push(require.resolve('ims-addon-adminer'))
            } else {
                addons.push(require.resolve('ims-addon-install'))
            }
        } catch (e) {
            console.log(`error`, e.message)
        }
    } else {
        addons.push(require.resolve('ims-addon-install'))
    }
    const pack = new ImsWebpacks(addons, dev);
    pack.run();
}
