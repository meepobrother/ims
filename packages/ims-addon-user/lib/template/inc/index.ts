import { Controller, HttpResult } from "ims-core";
import { parseInc } from "ims-adminer";
@Controller({
    path: "/"
})
export class ImsAddonUserInc {
}
export default parseInc(ImsAddonUserInc);
