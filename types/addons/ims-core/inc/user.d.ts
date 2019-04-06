import { Session, EntityRepository } from 'ims-core';
import { ImsUser } from '../typeorm';
export declare class ImsCoreUser {
    user: EntityRepository<ImsUser>;
    /**
     * 我的信息
     * @param sesion
     */
    userInfo(sesion: Session): Promise<ImsUser>;
}
