import { TypeContext } from 'ims-decorator'
import { AddonMetadataKey, AddonAst, IRouter } from 'ims-core'
import { Express } from 'express'
import { join } from 'path';
export default function handlerAddon(addon: TypeContext, router: Express, callback?: Function) {
    try {
        const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
        const template = addonAst.getTemplateAst().getConfig();
        if (template) {
            if (template.admins) template.admins.map(admin => {
                handlerRouter(admin, 'admin', router, callback);
            });
            if (template.mobiles) template.mobiles.map(admin => {
                handlerRouter(admin, 'mobile', router, callback);
            });
        }
    } catch (e) {
        console.log(e.message)
    }
}

function handlerRouter(irouter: IRouter, type: 'admin' | 'mobile', router: Express, callback?: Function) {
    const dist = join(process.cwd(), 'template', type, 'index.html');
    if (irouter.path) {
        if (irouter.redirect) {
            router.get(irouter.path, (req, res, next) => {
                res.redirect(irouter.redirect)
            });
            callback()
        } else {
            router.get(irouter.path, (req, res, next) => {
                res.sendFile(dist)
            });
            callback()
        }
        if (irouter.routes && irouter.routes.length > 0) {
            irouter.routes.map(route => handlerRouter(route, type, router, callback))
        }
    }
}
