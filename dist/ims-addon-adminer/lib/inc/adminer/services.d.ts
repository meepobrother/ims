import { EntityRepository } from 'ims-core';
import { ImsServer } from 'ims-model';
export declare class ImsCoreAdminerServer {
    server: EntityRepository<ImsServer>;
    getList(): Promise<[ImsServer[], number]>;
    addServer(body: any): Promise<{
        code: number;
        message: string;
        error?: undefined;
    } | {
        code: number;
        message: string;
        error: {
            message: any;
            stack: any;
        };
    }>;
}
