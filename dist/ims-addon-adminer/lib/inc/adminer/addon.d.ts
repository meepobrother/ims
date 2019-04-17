import { EntityRepository } from 'ims-core';
import { ImsAddonEntity } from 'ims-model';
export declare class ImsCoreAdminerSetting {
    addon: EntityRepository<ImsAddonEntity>;
    designAddon(body: any): Promise<{
        code: number;
        message: string;
        id?: undefined;
    } | {
        id: number;
        message: string;
        code?: undefined;
    }>;
    mineAddons(): Promise<[ImsAddonEntity[], number]>;
}
