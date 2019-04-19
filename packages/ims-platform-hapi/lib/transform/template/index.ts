import { TypeContext } from "ims-decorator";
import { Server } from "hapi";
import { join } from "path";
import { AddonMetadataKey, AddonAst, IRouter } from "ims-core";
const root = process.cwd();
export function transformTemplate(context: TypeContext, server: Server) {
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    const template = addonAst.getTemplate();
    template.admins.map(admin => {
        const file = join(root, 'attachment/template/admin/index.html');
        registerStaticPath(admin, file, server)
    });
    template.mobiles.map(mobile => {
        const file = join(root, 'attachment/template/mobile/index.html');
        registerStaticPath(mobile, file, server)
    });
}
function registerStaticPath(route: IRouter, file: string, server: Server) {
    // console.log(`static ${new Date().getTime()} ${route.path}`)
    if (!!route.redirect) {
        server.route({
            method: "GET",
            path: route.path,
            handler: (req, h) => {
                return h.redirect(route.redirect)
            }
        });
    } else {
        const opt: any = {
            method: "GET",
            path: route.path,
            handler: {
                file: file
            }
        };
        server.route(opt)
    }
    if (route.routes) {
        route.routes.map(r => registerStaticPath(r, file, server))
    }
}