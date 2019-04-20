import { TypeContext } from "ims-decorator";
import {
    AddonMetadataKey, AddonAst, HttpMethodContext, RoleMethodAst
} from "ims-core";
import { transformTypeorm } from '../typeorm'
export function transformRole(context: TypeContext) {
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    addonAst.incs.map(inc => {
        transformTypeorm(inc);
        const methods = inc.getMethod();
        methods.map((par: HttpMethodContext<any>) => {
            if (par instanceof RoleMethodAst) {
                inc.set(par.ast.propertyKey, par.ast.metadataDef)
            }
        });
    });
}
