import { Controller, Role, Get, GetProperty, Post, PostProperty } from "ims-core";
import { parseInc } from "ims-adminer";
@Controller({
    path: "/adminer/dashboard"
})
export class ImsCoreAdminerDashboard {
    @Get()
    @Role(["admin"])
    updateAnalysis: GetProperty<[], any>;
    /** 重新启动 */
    @Post()
    @Role((user: any) => {
        return user.role === "admin";
    })
    restart: PostProperty<[], any>;
    @Post()
    killPid: PostProperty<[any], any>;
}
export default parseInc(ImsCoreAdminerDashboard);
