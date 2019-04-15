import { EntityRepository, RoleParameter } from 'ims-core';
import { ImsAddonEntity } from 'ims-model';
export declare class ImsCoreAdminerSetting {
    addon: EntityRepository<ImsAddonEntity>;
    getInstall(role: RoleParameter): RoleParameter;
}
