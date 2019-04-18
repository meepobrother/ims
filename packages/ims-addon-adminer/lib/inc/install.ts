import { Controller, Get, HttpResult } from 'ims-core';

@Controller({
    path: '/install'
})
export class ImsAddonAdminerInstall {
    @Get()
    async successRestart(): HttpResult {
        return {
            code: 0,
            message: 'success'
        }
    }
}
