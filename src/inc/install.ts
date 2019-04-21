import { Controller, HttpResult, Get, GetProperty } from "ims-core";
import { parseInc } from "ims-adminer";
@Controller({
    path: "/install"
})
export class ImsAddonAdminerInstall {
    @Get()
    successRestart: GetProperty<[], HttpResult>;
}
export default parseInc(ImsAddonAdminerInstall);
