import { Controller, EntityRepository, Post, Body, Get } from 'ims-core'
import { ImsServer } from 'ims-model'
@Controller({
    path: '/adminer/services'
})
export class ImsCoreAdminerServer {

    @EntityRepository({
        db: 'system',
        target: ImsServer
    })
    server: EntityRepository<ImsServer>;

    @Get()
    getList() {
        return this.server.findAndCount()
    }

    @Post()
    async addServer(@Body() body: any) {
        try {
            const server = new ImsServer();
            server.name = body.name;
            server.path = body.path;
            server.upstream = body.upstream;
            await this.server.save(server)
            return {
                code: 0,
                message: '保存成功'
            }
        } catch (e) {
            return {
                code: -1,
                message: '插入数据失败',
                error: {
                    message: e.message,
                    stack: e.stack
                }
            }
        }
    }
}
