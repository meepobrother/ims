import { Command, Input } from 'ims-core';
import fs from 'fs-extra'
import { ImsCommand } from '../command';
import { join } from 'path';
@Command({
    name: 'init',
    alis: 'i'
})
export class ImsInit extends ImsCommand {
    /** 目录 */
    @Input({
        alis: 'p'
    })
    path: string = 'ims';

    run() {
        fs.ensureDirSync(join(this.root, this.path));
        /** 模板 */
        fs.ensureDirSync(join(this.root, this.path, 'template'))
        /** 附近 */
        fs.ensureDirSync(join(this.root, this.path, 'attachment'))
        /** 应用 */
        fs.ensureDirSync(join(this.root, this.path, 'addons'))
        /** 数据 */
        fs.ensureDirSync(join(this.root, this.path, 'data'))
        /** 开发中 */
        fs.ensureDirSync(join(this.root, this.path, 'packages'))
        /** package.json */
        fs.copyFileSync(join(__dirname, 'template', 'package.json'), join(this.root, this.path, 'package.json'))
        /** tsconfig.json */
        fs.copyFileSync(join(__dirname, 'template', 'package.json'), join(this.root, this.path, 'tsconfig.json'))
    }
}