"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const ims_core_1 = require("ims-core");
const root = process.cwd();
function transformTemplate(context, server) {
    const addonAst = context.getClass(ims_core_1.AddonMetadataKey);
    const template = addonAst.getTemplate();
    template.admins.map(admin => {
        const file = path_1.join(root, 'attachment/template/admin/index.html');
        registerStaticPath(admin, file, server);
    });
    template.mobiles.map(mobile => {
        const file = path_1.join(root, 'attachment/template/mobile/index.html');
        registerStaticPath(mobile, file, server);
    });
}
exports.transformTemplate = transformTemplate;
function registerStaticPath(route, file, server) {
    console.log(`static ${route.path}`);
    if (!!route.redirect) {
        server.route({
            method: "GET",
            path: route.path,
            options: { auth: false },
            handler: (req, h) => {
                return h.redirect(route.redirect);
            }
        });
    }
    else {
        const opt = {
            method: "GET",
            path: route.path,
            options: { auth: false },
            handler: {
                file: file
            }
        };
        server.route(opt);
    }
    if (route.routes) {
        route.routes.map(r => registerStaticPath(r, file, server));
    }
}
