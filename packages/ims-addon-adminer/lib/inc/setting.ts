import { Controller, Get, EntityRepository } from 'ims-core'
import { ImsSetting } from '../typeorm'
@Controller({
    path: '/setting'
})
export class ImsCoreAdminerSetting {

    @EntityRepository({
        target: ImsSetting
    })
    setting: EntityRepository<ImsSetting>;

    @Get()
    getSetting() {
        this.setting.findOne({
            
        });
    }
}