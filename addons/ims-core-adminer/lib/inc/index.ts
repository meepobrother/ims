import { Controller, Post, Body, EntityRepository, Role } from "ims-core";
import { ImsUserEntity } from 'ims-model';
import { isEqualPassword, sign, verify } from 'ims-node';

@Controller({
    path: '/user'
})
export class ImsCoreAdminerUser {
    @EntityRepository({
        target: ImsUserEntity,
        db: 'system'
    })
    user: EntityRepository<ImsUserEntity>;

    @Post()
    @Role(verify((user) => {
        console.log(user)
        return true;
    }))
    async login(@Body() msg: { username: string, password: string }) {
        const user = await this.user.findOne({
            username: msg.username
        });
        if (!user) {
            return {
                code: -1,
                message: '用户不存在或已注销'
            }
        } else {
            if (isEqualPassword(msg.password, user.token, user.password)) {
                return {
                    code: 0,
                    message: '登录成功',
                    data: {
                        username: user.username,
                        token: sign({
                            id: user.id,
                            username: user.username
                        })
                    }
                };
            } else {
                return {
                    code: -1,
                    message: '账户名或密码错误'
                }
            }
        }
    }
}