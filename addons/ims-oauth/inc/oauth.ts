import { Controller, Post, Body, EntityRepository, Session, Get, Redirect } from 'ims-core';
import { ImsUser } from '../typeorm';
import { randomBytes, createHmac } from 'crypto'
import { ImsError } from './services/error';
@Controller({
    path: '/',
    sourceRoot: __filename
})
export class ImsOauth {

    @EntityRepository({
        target: ImsUser
    })
    userRepository: EntityRepository<ImsUser>;

    @Get()
    test(@Session() session: Session) {
        return session.user || {};
    }

    @Post()
    async login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('redirect') redirect: string,
        @Session() session: Session,
        @Redirect() toRedirect: Redirect
    ) {
        const existUser = await this.userRepository.findOne({
            username: username
        });
        if (!existUser) {
            throw new Error(`用户名或密码错误`)
        }
        const decipher = createHmac('sha256', existUser.salt)
        const res = decipher.update(password).digest('hex');
        if (res === existUser.password) {
            session.user = {
                uid: existUser.uid,
                username: existUser.username
            };
            if (redirect) {
                return toRedirect(redirect)
            }
            return existUser;
        } else {
            throw new ImsError(`用户名或密码错误`)
        }
    }

    @Post()
    async register(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        // 检查用户名
        const existUser = await this.userRepository.findOne({
            username: username
        });
        if (existUser) {
            throw new Error(`用户名已存在`)
        } else {
            const user = new ImsUser();
            const salt = randomBytes(16).toString('hex')
            const decipher = createHmac('sha256', salt)
            user.password = decipher.update(password).digest('hex');
            user.username = username;
            user.salt = salt;
            await this.userRepository.save(user);
            return {
                data: user
            }
        }
    }
}
