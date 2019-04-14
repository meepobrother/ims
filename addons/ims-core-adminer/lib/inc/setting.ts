import { Controller, Get, EntityRepository, Role, RoleParameter } from 'ims-core'
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
    getSetting(@Role() role: RoleParameter) {
        this.setting.findOne({
            
        });
    }
}