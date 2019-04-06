import { EntityRepository } from 'ims-core';
import { ImsAccount } from '../../typeorm/entities/account';
import { ImsOAuthService } from './OAuth';
export declare class ImsAccountService {
    acid: number;
    accountRepository: EntityRepository<ImsAccount>;
    oauthService: ImsOAuthService;
    account: ImsAccount;
    static accountMap: Map<number, ImsAccountService>;
    constructor(acid: number, accountRepository: EntityRepository<ImsAccount>);
    static create(acid: number, accountRepository: EntityRepository<ImsAccount>): Promise<ImsAccountService>;
    onInit(): Promise<void>;
}
