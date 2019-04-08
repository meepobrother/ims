import { Session, EntityRepository } from 'ims-core';
import { ImsUserEntity } from 'ims-model';
export declare class ImsCoreUser {
    user: EntityRepository<ImsUserEntity>;
    /**
     * 我的信息
     * @param sesion
     */
    userInfo(sesion: Session): Promise<ImsUserEntity>;
}
