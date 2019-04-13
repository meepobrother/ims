import { TypeContext } from "ims-decorator";
import { AddonMetadataKey, AddonAst } from "ims-core";
import transformP2p from '../p2p';
import transformSocket from '../socket'
import transformHttp from '../http';
import { TransformOptions } from '../type'
import transformRole from '../role'
import { Router } from "express";
export default function transform(addon: TypeContext, options: TransformOptions) {
    const addonAst = addon.getClass(AddonMetadataKey) as AddonAst;
    const incs = addonAst.incs;
    const router = Router();
    incs.map(inc => {
        transformRole(inc, options);
        transformP2p(inc, options);
        transformSocket(inc, options);
        const path = transformHttp(inc, options);
        router.use(path.path, path.router)
    });
    options.app.use(addonAst.path, router);
}