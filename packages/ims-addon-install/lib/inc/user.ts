import { Controller, Post, Role } from 'ims-core';
export interface IRegisterOptions { }
export interface IRegisterResult {
    id: number;
}
@Controller()
export class ImsUser {

    @Post()
    @Role()
    async register(opts: IRegisterOptions): Promise<IRegisterResult> {
        return {
            id: 1
        }
    }
}