
import { TypeContext, AppMetadataKey, AppAst, AddonMetadataKey, AddonAst, RouterAst, RouterMetadataKey, TemplateMetadataKey, TemplateAst } from 'ims-common';
import * as core from "express-serve-static-core";
import { join } from 'path';
import { existsSync } from 'fs';
export default function (context: TypeContext, app: core.Express) {
    const appAst = context.getClass(AppMetadataKey) as AppAst;
    const adminDist = join(process.cwd(), 'template', 'admin', 'index.html')
    const mobileDist = join(process.cwd(), 'template', 'mobile', 'index.html')
    appAst.addons.map(addon => {
        handlerAddon(addon, app);
    });
    app.get('/', (req, res, next) => {
        res.sendFile(adminDist);
    });
    app.get('/app', (req, res, next) => {
        res.sendFile(mobileDist);
    });
}

function handlerAddon(addon: TypeContext, router: core.Express) {
    const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
    const template = addonAst.template;
    if (template) {
        const templateAst = template.getClass(TemplateMetadataKey) as TemplateAst;
        if (templateAst.admins) templateAst.admins.map(admin => {
            handlerRouter(admin, addon, 'admin', router);
        });
        if (templateAst.mobiles) templateAst.mobiles.map(admin => {
            handlerRouter(admin, addon, 'mobile', router);
        });
    }
}

function handlerRouter(context: TypeContext, addon: TypeContext, type: 'admin' | 'mobile', router: core.Express) {
    const routerAst = context.getClass(RouterMetadataKey) as RouterAst;
    if (routerAst) {
        const dist = join(process.cwd(), 'template', type, 'index.html');
        const def = { ...routerAst.ast.metadataDef };
        const path = routerAst.getPath();
        if (Array.isArray(routerAst.routes)) {
            routerAst.routes.map(route => {
                handlerRouter(route, addon, type, router);
            });
        }
        if (def.redirect) {
            routerAst.redirect = routerAst.getRedirect();
            if (def.path) {
                router.get(path, (req, res, next) => {
                    res.redirect(routerAst.redirect)
                });
            }
        }
        router.get(path, (req, res, next) => {
            res.sendFile(dist)
        });
    }
}
