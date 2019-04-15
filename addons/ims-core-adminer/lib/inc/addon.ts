import { Controller, Get, EntityRepository, Role, RoleParameter } from 'ims-core'
import { ImsAddonEntity } from 'ims-model'
@Controller({
    path: '/setting'
})
export class ImsCoreAdminerSetting {

    @EntityRepository({
        target: ImsAddonEntity
    })
    addon: EntityRepository<ImsAddonEntity>;

    @Get()
    getInstall(@Role() role: RoleParameter) {
        return role;
    }
}