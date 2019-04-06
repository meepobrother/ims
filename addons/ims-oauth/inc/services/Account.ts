import { EntityRepository } from 'ims-core';
import { ImsAccount } from '../../typeorm/entities/account';
import { ImsOAuthService } from './OAuth'
export class ImsAccountService {
    oauthService: ImsOAuthService;
    account: ImsAccount;
    static accountMap: Map<number, ImsAccountService> = new Map();
    constructor(public acid: number, public accountRepository: EntityRepository<ImsAccount>) { }

    static async create(acid: number, accountRepository: EntityRepository<ImsAccount>) {
        if (!accountRepository) throw new Error(`accountRepository is not undefined`)
        if (acid <= 0) throw new Error(`acid is <=0 `)
        if (this.accountMap.has(acid)) return this.accountMap.get(acid);
        const oauth = new ImsAccountService(acid, accountRepository)
        await oauth.onInit();
        this.accountMap.set(acid, oauth);
        return oauth;
    }
    async onInit() {
        try {
            this.account = await this.accountRepository.findOneOrFail({
                id: this.acid
            });
            if (!this.account) {
                throw new Error(`can't load Account ${this.acid}`)
            }
            switch (this.account.type) {
                case 'weapp':
                    this.oauthService = new ImsOAuthService(this.account.appId, this.account.appSecret, true)
                    break;
                case 'wechat':
                    this.oauthService = new ImsOAuthService(this.account.appId, this.account.appSecret, false)
                    break;
                default:
                    throw new Error(`not support ${this.account.type}`);
            }
        } catch (e) {
            e.name = `ImsAccountService:onInit`;
            throw e;
        }
    }
}
