import { Controller, Role, Post, PostProperty } from "ims-core";
export interface IRegisterOptions {
}
export interface IRegisterResult {
    id: number;
}
@Controller()
export class ImsUser {
    @Post()
    @Role()
    register: PostProperty<[IRegisterOptions], Promise<IRegisterResult>>;
}
