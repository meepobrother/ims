import { Controller, Post, Body, EntityRepository, RepositoryType } from "ims-core";
import { ImsUserEntity } from 'ims-model'
import { isEqualPassword } from 'ims-node'
@Controller({
    path: '/user'
})
export class ImsCoreAdminerUser {
    @EntityRepository({
        target: ImsUserEntity,
        db: RepositoryType.system
    })
    user: EntityRepository<ImsUserEntity>;
    
    @Post()
    async login(@Body() msg: { username: string, password: string }) {
        console.log(this.user)
        const user = await this.user.findOne({
            username: msg.username
        });
        if (!user) {
            return {
                message: '用户不存在或已注销'
            }
        } else {
            if (isEqualPassword(msg.password, user.token, user.password)) {
                return user;
            } else {
                return {
                    message: '账户名或密码错误'
                }
            }
        }
    }
}