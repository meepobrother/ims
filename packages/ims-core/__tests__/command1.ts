import { Command } from '../lib';
import { Option } from '../lib';

@Command({
    name: 'command1 <cmd> [oths...]',
    description: 'command1 desc',
    example: {
        command: 'ims command1 cmd',
        description: 'command1 example'
    }
})
export class ImsCommand1 {
    @Option({
        alias: 't',
        description: '标题'
    })
    title: string = 'title';

    async run() {
        console.log(`command1 ${this.title}`)
    }
}
