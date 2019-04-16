import { Controller, Get } from 'ims-core'
@Controller({
    path: '/setting'
})
export class imsDemoSetting {
    @Get()
    getSetting() {}
}