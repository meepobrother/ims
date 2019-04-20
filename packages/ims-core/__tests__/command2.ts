import { Command } from '../lib';
import { Option } from '../lib';

@Command({
    name: 'command2 <cmd> [oths...]',
    description: 'command2 desc',
    example: {
        command: 'ims command2 cmd',
        description: 'command2 example'
    }
})
export class ImsCommand2 {
    @Option({
        alias: 't'
    })
    title: string = 'title';

    async run() {
        console.log(`command2 ${this.title}`)
    }
}
