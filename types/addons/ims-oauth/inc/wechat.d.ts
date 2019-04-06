import { EntityRepository, Req, Socket, Server } from 'ims-core';
import { ImsAccount } from '../typeorm/entities/account';
export declare class ImsOauthWechat {
    imsAccount: EntityRepository<ImsAccount>;
    test(): Promise<void>;
    wechatLoginInfo: Map<number, any>;
    wechatLoginId: number;
    server: Server;
    getWechatLoginResult(socket: Socket, data: any): void;
    /**
     * 手机打开询问授权
     * @param req
     * @param acid
     */
    getWechatLoginUrl(req: Req, acid: number): Promise<string>;
    /**
     * 微信端同意授权
     * @param code
     * @param state
     */
    getWechatLoginHandler(code: string, state: number): Promise<void>;
}
