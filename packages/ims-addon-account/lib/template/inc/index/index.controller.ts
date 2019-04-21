import { Controller, HttpResult, Get, GetProperty } from "ims-core";
import { parseInc } from "ims-adminer";
@Controller({
    /** 路由路径 */
    path: "/",
    /** 子路由 */
    childern: []
})
export class ImsIndexController {
    @Get()
    loadMore: GetProperty<[], HttpResult>;
}
export default parseInc(ImsIndexController);
