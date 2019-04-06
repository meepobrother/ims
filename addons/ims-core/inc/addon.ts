import { Controller, Get, EntityRepository, Query, Post, Body, Session, RepositoryType } from 'ims-core';
import { ImsAddonEntity } from 'ims-model';

@Controller({
    path: '/addon'
})
export class ImsCoreAddon {
    @EntityRepository({
        db: RepositoryType.system,
        target: ImsAddonEntity
    })
    addonRepository: EntityRepository<ImsAddonEntity>;
    /**
     * 获取应用列表
     * @param page 
     * @param pageSize 
     */
    @Get()
    search(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number
    ) {
        return this.addonRepository.findAndCount({
            skip: page * pageSize,
            take: pageSize,
            order: {
                'create_at': 'DESC'
            }
        })
    }

    /**
     * 安装应用
     */
    @Post()
    install(@Body('appId') appId: string, @Session() session: Session) {
        const user = session.user;
        return {
            appId
        }
    }

}