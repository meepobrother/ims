import {
    connect, start, disconnect,
    stop, restart, reload, killDaemon,
    describe, list, dump, flush, reloadLogs,
    launchBus, sendSignalToProcessName, startup,
    sendDataToProcessId,
    Proc, ProcessDescription
} from 'pm2';

const stopHandler: any = (err: Error, proc: Proc[]) => {
    console.log({ err, proc })
}

const startHandler: any = (err: Error, proc: Proc[]) => {
    console.log({ err, proc })
    proc.map(pro => {
        stop('demo', stopHandler)
    });
}

start({
    name: 'demo',
    script: 'node',
    args: ['-v'],
    cwd: process.cwd()
}, startHandler);

list((err: Error, processDescriptionList: ProcessDescription[]) => {
    console.log({ err, processDescriptionList })
});

dump((err: Error, result: any) => {
    console.log({ err, result })
});
