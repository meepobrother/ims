import { Type } from "ims-decorator";
import { visitor } from "ims-common";

import { watch } from 'chokidar';
import { AddonMetadataKey, AddonAst } from "ims-core";
import { ImsApplication } from "../transform/application";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export function watchAddon(type: Type<any>) {
    const context = visitor.visitType(type);
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    const change = new Subject();
    change.pipe(
        debounceTime(500)
    ).subscribe(() => {
        if (ImsApplication.application) {
            const type = require(addonAst.sourceRoot).default;
            ImsApplication.application.reInstall(type)
        }
    });
    watch(`${addonAst.sourceRoot}`).on('all', (eventName, path) => {
        change.next()
    })
}