import { Controller, Post, EntityRepository, Get, Req, HttpResult } from "ims-core";
import { ImsUserEntity } from 'ims-model';
import { isEqualPassword, sign, verify } from 'ims-node';
import { getConfig } from "ims-common";
export interface LoginOptions {
    username: string;
    password: string
}
export interface LoginOutput {
    username: string;
    role: string;
    token: string;
}
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
    async login(msg: LoginOptions): HttpResult<LoginOutput> {
        const { username, password } = msg;
        try {
            const user = await this.user.findOne({
                username: username
            });
            if (!user) {
                return {
                    code: -1,
                    message: '用户不存在或已注销'
                }
            } else {
                if (isEqualPassword(password, user.token, user.password)) {
                    const config = getConfig();
                    let role = 'default';
                    if (config.admin.includes(user.id)) {
                        role = 'admin';
                    } else {
                        role = 'manager';
                    }
                    return {
                        code: 0,
                        message: '登录成功',
                        data: {
                            username: user.username,
                            role,
                            token: sign({
                                id: user.id,
                                username: user.username,
                                role
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
        } catch (e) {
            return {
                code: -1,
                message: e.message,
                stack: e.stack
            }
        }

    }

    @Get()
    async getRole(@Req() req?: Req) {
        verify((user) => {
            console.log(user)
            return true;
        });
        const user: any = req.user || {};
        // 返回角色和用户名
        return {
            role: user.role,
            username: user.username,
            headers: req.headers
        }
    }
}
