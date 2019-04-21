import { packProject } from '../../build';
import yargs from 'yargs';
yargs.command(`start [project]`, false, (args) => {
    return args;
}, (argv) => {
    const project: any = argv.project;
    if (project) {
        packProject(project, 'node_modules', 'projects', true)
    }
}).argv;