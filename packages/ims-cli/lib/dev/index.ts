import { Command, Input } from 'ims-core';
import { ImsCommand } from '../command';
import { bootstrap } from '../start/bootstrap'
import { bootstrap as templateBootstrap } from '../start/bin/template';
@Command({
    name: 'dev'
})
export class ImsDev extends ImsCommand {
    async run() {
        await bootstrap(this.root, true)
        await templateBootstrap(true);
        console.log(`服务启动成功`)
    }
}
