import { EntityRepository, Session } from 'ims-core';
import { ImsAddonEntity } from '../typeorm';
export declare class ImsCoreAddon {
    addonRepository: EntityRepository<ImsAddonEntity>;
    /**
     * 获取应用列表
     * @param page
     * @param pageSize
     */
    search(page: number, pageSize: number): Promise<[ImsAddonEntity[], number]>;
    /**
     * 安装应用
     */
    install(appId: string, session: Session): {
        appId: string;
    };
}
