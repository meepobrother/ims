import { Controller, HttpResult, Get, GetProperty } from "ims-core";
import { parseInc } from "ims-adminer";
@Controller({
    path: "/setting"
})
export class ImsCoreAdminerSetting {
    @Get()
    getSetting: GetProperty<[], any>;
}
export default parseInc(ImsCoreAdminerSetting);
