import { Type } from "ims-decorator";
import { visitor } from "ims-common";

import { watch } from 'chokidar';
import { AddonMetadataKey, AddonAst } from "ims-core";
import { ImsApplication } from "../transform/application";

export function watchAddon(type: Type<any>) {
    const context = visitor.visitType(type);
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    const path = addonAst.sourceRoot;
    watch(`${addonAst.sourceRoot}/**/*.ts`).on('all', () => {
        if (ImsApplication.application) {
            const type = require(path).default;
            ImsApplication.application.reInstall(type)
        }
    })
}