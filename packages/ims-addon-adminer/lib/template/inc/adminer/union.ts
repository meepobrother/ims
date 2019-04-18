import { Controller, HttpResult, Get, GetProperty, Post, PostProperty } from "ims-core";
import { parseInc } from "ims-adminer";
@Controller({
    path: "/adminer/union"
})
export class ImsCoreAdminerUnion {
    @Get()
    getUnionList: GetProperty<[], any>;
    @Post()
    addUnion: PostProperty<[any], any>;
}
export default parseInc(ImsCoreAdminerUnion);
