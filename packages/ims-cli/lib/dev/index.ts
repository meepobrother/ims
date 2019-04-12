import { Command } from 'ims-core';
import { ImsCommand } from '../command';
import { exec } from 'shelljs'
@Command({
    name: 'dev'
})
export class ImsDev extends ImsCommand {
    async run() {
        exec(`pm2 start `)
    }
}
