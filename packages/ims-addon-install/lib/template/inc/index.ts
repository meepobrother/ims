import { Controller, Post, PostProperty } from "ims-core";
import { parseInc } from "ims-adminer";
@Controller({
    path: "/install"
})
export class ImsIndex {
    @Post()
    setDatabase: PostProperty<[any], any>;
    @Post()
    setUser: PostProperty<[any], any>;
    @Post()
    restart: PostProperty<[], any>;
}
export default parseInc(ImsIndex);
