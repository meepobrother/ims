import { Controller, Get, Role, Post } from 'ims-core'
import os from 'os';
import { exec } from 'shelljs'
import { verify } from 'ims-node'
import { list, ProcessDescription } from 'pm2'
@Controller({
    path: '/adminer/dashboard'
})
export class ImsCoreAdminerDashboard {
    @Get()
    @Role(verify((user: any) => {
        return user.role === 'admin'
    }))
    async updateAnalysis() {
        return {
            hostname: os.hostname(),
            uptime: os.uptime(),
            freemem: os.freemem(),
            totalmem: os.totalmem(),
            cpus: os.cpus(),
            type: os.type(),
            release: os.release(),
            networkInterfaces: os.networkInterfaces(),
            homedir: os.homedir(),
            platform: os.platform(),
            tmpdir: os.tmpdir(),
            arch: os.arch()
        }
    }

    /** 重新启动 */
    @Post()
    @Role((user: any) => {
        return user.role === 'admin'
    })
    restart() {
        exec(`pm2 retart all`)
    }

    @Get()
    @Role(verify((user: any) => {
        return user.role === 'admin'
    }))
    pm2List() {
        return new Promise((resolve, reject) => {
            list((err: Error, processDescriptionList: ProcessDescription[]) => {
                if (err) reject(err);
                const lis = processDescriptionList.map(li => {
                    return {
                        name: li.name,
                        pid: li.pid,
                        pm_id: li.pm_id,
                        monit: li.monit
                    }
                });
                resolve(lis)
            })
        })
    }
}