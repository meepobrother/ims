import { Controller, HttpResult, Get, GetProperty, Post, PostProperty } from "ims-core";
import { parseInc } from "ims-adminer";
@Controller({
    path: "/adminer/services"
})
export class ImsCoreAdminerServer {
    @Get()
    getList: GetProperty<[], any>;
    @Post()
    addServer: PostProperty<[any], any>;
}
export default parseInc(ImsCoreAdminerServer);
