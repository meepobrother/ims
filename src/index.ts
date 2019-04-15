import { loadavg } from 'os'

const avg = loadavg();

import { exec } from 'shelljs'
const top = exec(`top`, {
    cwd: process.cwd()
}, () => { })

top.stdout.on('data', (chunk: string) => {
    const chunks = chunk.split('\n')
    const res = {
        processes: getProcesses(chunks[0])
    }
    debugger;
})

function getProcesses(chunk: string) {
    const processes = /Processes:(.*?)total,(.*?)running,(.*?)sleeping,(.*?)threads/
    const res = processes.exec(chunk);
    return {
        total: res[1].trim(),
        running: res[2].trim(),
        sleeping: res[3].trim(),
        threads: res[4].trim()
    }
}