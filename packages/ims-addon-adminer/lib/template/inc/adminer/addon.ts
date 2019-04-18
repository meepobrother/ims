import { Controller, Role, Post, PostProperty, Get, GetProperty } from "ims-core";
import { parseInc } from "ims-adminer";
@Controller({
    path: "/adminer/addon"
})
export class ImsCoreAdminerSetting {
    @Post()
    @Role(["admin"])
    designAddon: PostProperty<[any], any>;
    @Get()
    mineAddons: GetProperty<[], any>;
}
export default parseInc(ImsCoreAdminerSetting);
