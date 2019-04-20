import { Command, Option } from 'ims-core';
import fs from 'fs-extra'
import { ImsCommand } from '../command';
import { join } from 'path';
@Command({
    name: 'init <project>',
    description: '初始化项目',
    example: {
        command: `ims init ims-demo`,
        description: `初始化一个ims-demo项目`
    }
})
export class ImsInit extends ImsCommand {

    @Option({
        alias: 't',
        description: '类型'
    })
    type: string;

    path: string;

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