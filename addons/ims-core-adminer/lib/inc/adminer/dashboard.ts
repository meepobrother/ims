import { Controller, Get, Role, RoleParameter, Post, Socket } from 'ims-core'
import os from 'os';
import { exec } from 'shelljs'
@Controller({
    path: '/adminer/dashboard'
})
export class ImsCoreAdminerDashboard {
    @Get()
    @Role((user: any) => {
        return user.role === 'admin'
    })
    updateAnalysis(@Role() role: RoleParameter) {
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
}