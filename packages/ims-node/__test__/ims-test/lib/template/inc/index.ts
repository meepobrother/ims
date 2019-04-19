import { Controller, HttpResult } from "ims-core";
import { parseInc } from "ims-adminer";
interface GetUserOptions {
    id: number;
}
@Controller({
    path: "/ims-demo/"
})
export class ImsDemo {
}
export default parseInc(ImsDemo);
