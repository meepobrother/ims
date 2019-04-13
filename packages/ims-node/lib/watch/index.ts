import { Type } from "ims-decorator";
import { visitor } from "ims-common";

import { watch } from 'chokidar';
import { AddonMetadataKey, AddonAst } from "ims-core";
import { ImsApplication } from "../transform/application";

export function watchAddon(type: Type<any>) {
    const context = visitor.visitType(type);
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    watch(`${addonAst.sourceRoot}/**/*.ts`).on('all', (eventName, path) => {
        if (ImsApplication.application) {
            const path = addonAst.sourceRoot;
            delete require.cache[path];
            const type = require(path).default;
            ImsApplication.application.reInstall(type)
        }
    })
}