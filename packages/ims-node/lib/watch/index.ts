import { Type, getContext } from "ims-decorator";
import { visitor } from "ims-common";

import { watch } from 'chokidar';
import { AddonMetadataKey, AddonAst } from "ims-core";
import { ImsApplication } from "../transform/application";

export function watchAddon(type: Type<any>) {
    const context = visitor.visitType(type);
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    watch(`${addonAst.sourceRoot}`).on('all', (eventName, path) => {
        if (ImsApplication.application) {
            console.log(`${eventName}${path}`);
            // delete require.cache[path];
            const type = require(addonAst.path).default;
            ImsApplication.application.reInstall(type)
        }
    })
}