import { Controller, EntityRepository, Get, Query, Req, On, Body, Socket, Server } from 'ims-core';
import { ImsAccount } from '../typeorm/entities/account';
import { ImsAccountService } from './services/Account';

@Controller({
    path: '/wechat',
    sourceRoot: __filename
})
export class ImsOauthWechat {
    @EntityRepository({
        target: ImsAccount
    })
    imsAccount: EntityRepository<ImsAccount>;

    @Get()
    async test() {
        let account = await this.imsAccount.findOneOrFail({
            id: 1
        })
        if (!account) {
            account = new ImsAccount();
        }
        account.appId = 'wx6e41c8b66a4a3cf1';
        account.appSecret = 'a6f836bff718ef8f6b053e1a3db238a9';
        account.qrcode = '';
        account.title = '米波网络';
        account.type = 'wechat';
        account.uniacid = 0;
        this.imsAccount.save(account)
    }

    wechatLoginInfo: Map<number, any> = new Map();
    wechatLoginId: number = 0;

    @Server()
    server: Server;

    @On()
    getWechatLoginResult(@Socket() socket: Socket, @Body() data: any) {
        socket.send(JSON.stringify({
            type: 'hello',
            payload: data
        }));
    }

    /**
     * 手机打开询问授权
     * @param req 
     * @param acid 
     */
    @Get()
    async getWechatLoginUrl(@Req() req: Req, @Query('acid') acid: number) {
        const { hostname } = req;
        const account = await ImsAccountService.create(acid, this.imsAccount);
        const redirect = `${hostname}/ims-oauth/wechat/getWechatLoginHandler?acid=${acid}`;
        this.wechatLoginId += 1;
        return account.oauthService.getAuthorizeURL(redirect, `${this.wechatLoginId}`);
    }
    /**
     * 微信端同意授权
     * @param code 
     * @param state 
     */
    @Get()
    async getWechatLoginHandler(
        @Query('code') code: string,
        @Query('state') state: number
    ) {
        // 获取openid
        this.wechatLoginInfo.set(state, code);
    }
}