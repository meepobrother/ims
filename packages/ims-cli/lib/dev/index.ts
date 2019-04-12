import { Command } from 'ims-core';
import { ImsCommand } from '../command';
import { join } from 'path'
import { execSync } from 'ims-node'
@Command({
    name: 'dev'
})
export class ImsDev extends ImsCommand {
    async run() {
        await execSync(`pm2 start ${join(__dirname, 'bin.ts')} --name imsDev --watch`)
    }
}
