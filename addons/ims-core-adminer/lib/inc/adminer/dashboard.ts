import { Controller, Get, Role, Post, Body } from 'ims-core'
import os from 'os';
import { exec } from 'shelljs'
import { verify, execSync } from 'ims-node'
import { list, ProcessDescription } from 'pm2';
import ps = require('current-processes');

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
            arch: os.arch(),
            avg: os.loadavg(),
            processes: await this.getProcesses(),
            pm2: await this.pm2List(),
            node: {
                path: process.execPath,
                cwd: process.cwd(),
                versions: process.versions,
                npm: await execSync(`npm -v`)
            }
        }
    }

    getProcesses() {
        return new Promise((resolve, reject) => {
            ps.get((err, processes) => {
                if (err) reject(err)
                resolve(processes);
            });
        });
    }

    /** 重新启动 */
    @Post()
    @Role((user: any) => {
        return user.role === 'admin'
    })
    restart() {
        exec(`pm2 retart all`)
    }

    @Post()
    killPid(@Body() body: any) {
        exec(`killall ${body.id}`)
    }

    pm2List() {
        const titles = {
            dev: '服务',
            template_dev: '模板',
            prod: '服务',
            template_prod: '模板'
        }
        return new Promise((resolve, reject) => {
            list((err: Error, processDescriptionList: ProcessDescription[]) => {
                if (err) reject(err);
                const lis = processDescriptionList.map((li, key) => {
                    return {
                        name: li.name,
                        title: titles[li.name] || `任务${key}`,
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