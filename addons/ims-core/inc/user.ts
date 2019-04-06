import { Controller, Get, Session, EntityRepository, RepositoryType } from 'ims-core';
import { ImsUserEntity } from 'ims-model';

@Controller({
    path: '/user'
})
export class ImsCoreUser {
    @EntityRepository({
        db: RepositoryType.system,
        target: ImsUserEntity
    })
    user: EntityRepository<ImsUserEntity>;
    /**
     * 我的信息
     * @param sesion 
     */
    @Get()
    async userInfo(@Session() sesion: Session) {
        const user = sesion.user;
        return await this.user.findOne({
            id: user.id
        });
    }
}
