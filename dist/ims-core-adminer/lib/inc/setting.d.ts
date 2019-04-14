import { EntityRepository, RoleParameter } from 'ims-core';
import { ImsSetting } from '../typeorm';
export declare class ImsCoreAdminerSetting {
    setting: EntityRepository<ImsSetting>;
    getSetting(role: RoleParameter): void;
}
