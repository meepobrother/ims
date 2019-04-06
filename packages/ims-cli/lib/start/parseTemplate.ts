import { visitor, } from 'ims-common';
import { Type, TypeContext } from 'ims-decorator'
import { RouterMetadataKey, RouterAst, AddonMetadataKey, AddonAst } from 'ims-core'
import { Express } from 'express'
import { join } from 'path'
export function parseTemplate(addons: Type<any>[], app: Express, root: string) {
    addons.map(addon => {
        const context = visitor.visitType(addon);
        handlerAddon(context, app);
    })
    const adminDist = join(root, 'template', 'admin', 'index.html')
    const mobileDist = join(root, 'template', 'mobile', 'index.html')
    app.get('/', (req, res, next) => {
        res.sendFile(adminDist);
    });
    app.get('/app', (req, res, next) => {
        res.sendFile(mobileDist);
    });
}


function handlerAddon(addon: TypeContext, router: Express) {
    try {
        const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
        const templateAst = addonAst.getTemplateAst();
        if (templateAst) {
            if (templateAst.admins) templateAst.admins.map(admin => {
                handlerRouter(admin, addon, 'admin', router);
            });
            if (templateAst.mobiles) templateAst.mobiles.map(admin => {
                handlerRouter(admin, addon, 'mobile', router);
            });
        }
    } catch (e) {
        console.log(e.message)
    }
}

function handlerRouter(context: TypeContext, addon: TypeContext, type: 'admin' | 'mobile', router: Express) {
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
