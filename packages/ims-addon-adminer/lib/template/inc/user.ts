import { Controller, HttpResult, Post, PostProperty, Get, GetProperty } from "ims-core";
import { parseInc } from "ims-adminer";
export interface LoginOptions {
    username: string;
    password: string;
}
export interface LoginOutput {
    username: string;
    role: string;
    token: string;
}
@Controller({
    path: "/user"
})
export class ImsCoreAdminerUser {
    @Post()
    login: PostProperty<[LoginOptions], HttpResult<LoginOutput>>;
    @Get()
    getRole: GetProperty<[any], any>;
}
export default parseInc(ImsCoreAdminerUser);
