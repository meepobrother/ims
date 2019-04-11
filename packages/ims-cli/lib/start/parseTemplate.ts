import { visitor, } from 'ims-common';
import { Type, TypeContext } from 'ims-decorator'
import { AddonMetadataKey, AddonAst, IRouter } from 'ims-core'
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
        const template = addonAst.getTemplateAst().getConfig();
        if (template) {
            if (template.admins) template.admins.map(admin => {
                handlerRouter(admin, 'admin', router);
            });
            if (template.mobiles) template.mobiles.map(admin => {
                handlerRouter(admin, 'mobile', router);
            });
        }
    } catch (e) {
        console.log(e.message)
    }
}

function handlerRouter(irouter: IRouter, type: 'admin' | 'mobile', router: Express) {
    const dist = join(process.cwd(), 'template', type, 'index.html');
    if (irouter.path) {
        if (irouter.redirect) {
            router.get(irouter.path, (req, res, next) => {
                res.redirect(irouter.redirect)
            })
        } else {
            router.get(irouter.path, (req, res, next) => {
                res.sendFile(dist)
            });
        }
        if (irouter.routes) {
            irouter.routes.map(route => handlerRouter(route, type, router))
        }
    }
}
