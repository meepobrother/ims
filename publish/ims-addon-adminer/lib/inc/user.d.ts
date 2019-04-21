import { EntityRepository, Req, HttpResult } from "ims-core";
import { ImsUserEntity } from 'ims-model';
export interface LoginOptions {
    username: string;
    password: string;
}
export interface LoginOutput {
    username: string;
    role: string;
    token: string;
}
export declare class ImsCoreAdminerUser {
    user: EntityRepository<ImsUserEntity>;
    login(msg: LoginOptions): HttpResult<LoginOutput>;
    getRole(req?: Req): Promise<{
        role: any;
        username: any;
        headers: import("../../../ims-types/lib/hapi").Util.Dictionary<string>;
    }>;
}
