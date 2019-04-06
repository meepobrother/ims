import { Command, Input } from 'ims-core';
import { ImsCommand } from '../command';
import { bootstrap } from './bootstrap'
import { join } from 'path';
@Command({
    name: 'start'
})
export class ImsStart extends ImsCommand {
    @Input({
        alis: 's'
    })
    source: string = '';

    @Input({
        alis: 'd'
    })
    dev: boolean = false;

    run() {
        // 安装器
        bootstrap(join(this.root, this.source), this.dev);
    }
}
