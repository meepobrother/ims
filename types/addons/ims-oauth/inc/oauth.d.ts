import { EntityRepository, Session, Redirect } from 'ims-core';
import { ImsUser } from '../typeorm';
export declare class ImsOauth {
    userRepository: EntityRepository<ImsUser>;
    test(session: Session): any;
    login(username: string, password: string, redirect: string, session: Session, toRedirect: Redirect): Promise<void | ImsUser>;
    register(username: string, password: string): Promise<{
        data: ImsUser;
    }>;
}
