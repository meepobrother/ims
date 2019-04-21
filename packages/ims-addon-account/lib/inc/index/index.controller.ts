import { Controller, Get, HttpResult, Inject } from "ims-core";
import { ImsIndexInjectable } from './index.service';

@Controller({
    /** 路由路径 */
    path: '/',
    /** 子路由 */
    childern: []
})
export class ImsIndexController {
    @Inject()
    index: ImsIndexInjectable;

    @Get()
    async loadMore(): HttpResult {
        return {
            code: 0,
            message: '获取成功',
            data: {
                list: this.index.loadMore()
            }
        };
    }
}
