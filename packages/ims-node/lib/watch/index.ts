import { Type, getContext } from "ims-decorator";
import { visitor } from "ims-common";

import { watch } from 'chokidar';
import { AddonMetadataKey, AddonAst } from "ims-core";
import { ImsApplication } from "../transform/application";

export function watchAddon(type: Type<any>) {
    const context = visitor.visitType(type);
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    watch(`${addonAst.sourceRoot}/**/*.ts`).on('all', (eventName, path) => {
        if (ImsApplication.application) {
            console.log(`${eventName}${path}`);
            delete require.cache[path];
            const type = require(addonAst.path).default;
            console.log(getContext(type))
            // ImsApplication.application.reInstall(type)
        }
    })
}