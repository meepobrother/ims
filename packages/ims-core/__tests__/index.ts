import { transformCli } from './util';
import { ImsCommand1 } from './command1'
import { ImsCommand2 } from './command2'
import { visitor } from 'ims-common';
import { Cli } from 'ims-core'
const pkg = require('../package.json')
@Cli({
    name: 'ims-cli',
    version: pkg.version,
    commands: [
        ImsCommand1,
        ImsCommand2
    ]
})
export class ImsCli { }
transformCli(visitor.visitType(ImsCli));
