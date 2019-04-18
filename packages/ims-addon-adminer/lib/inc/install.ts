import { Controller, Get } from 'ims-core';

@Controller({
    path: '/install'
})
export class ImsAddonAdminerInstall {
    @Get()
    successRestart() { }
}