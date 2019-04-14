import { EntityRepository } from "ims-core";
import { ImsUserEntity } from 'ims-model';
export declare class ImsCoreAdminerUser {
    user: EntityRepository<ImsUserEntity>;
    login(msg: {
        username: string;
        password: string;
    }): Promise<{
        code: number;
        message: string;
        data?: undefined;
    } | {
        code: number;
        message: string;
        data: {
            username: string;
            role: string;
            token: string;
        };
    }>;
}
