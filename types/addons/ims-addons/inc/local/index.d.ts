import { EntityRepository } from "ims-common";
import { ImsAddonEntity } from 'ims-adminer';
export declare class ImsAddonsLocal {
    addonRepository: EntityRepository<ImsAddonEntity>;
    /**
     * 发布应用
     */
    publish(): {
        publish: string;
    };
    clear(): Promise<{
        code: string;
    }>;
    list(): Promise<any>;
    /**
     * 安装应用
     */
    install(body: {
        sourceRoot: string;
    }): Promise<any>;
    /**
     * 卸载应用
     */
    uninstall(body: any): void;
}
