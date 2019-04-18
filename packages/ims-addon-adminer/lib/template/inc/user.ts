import { Controller, HttpResult, Post, PostProperty, Role, Get, GetProperty } from "ims-core";
import { parseInc } from "ims-adminer";
@Controller({
    path: "/user"
})
export class ImsCoreAdminerUser {
    @Post()
    login: PostProperty<[{
        username: string;
        password: string;
    }], any>;
    @Get()
    @Role(["admin"])
    getRole: GetProperty<[any], any>;
}
export default parseInc(ImsCoreAdminerUser);
