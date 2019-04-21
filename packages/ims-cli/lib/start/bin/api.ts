import { ImsPlatformHapi } from 'ims-platform-hapi';
import yargs from 'yargs';
yargs.command(`start [project]`, false, (args) => {
    return args;
}, (argv) => {
    const hapi = new ImsPlatformHapi()
    const project: any = argv.project;
    console.log(project);
    if (project) {
        hapi.addAddon(require.resolve(project))
    }
    hapi.init();
});
