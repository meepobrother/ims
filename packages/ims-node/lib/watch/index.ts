import { Type } from "ims-decorator";
import { visitor } from "ims-common";

import { watch } from 'chokidar';
import { AddonMetadataKey, AddonAst } from "ims-core";
import { ImsApplication } from "../transform/application";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
const change = new Subject();
change.pipe(
    debounceTime(500)
).subscribe((sourceRoot: string) => {
    if (ImsApplication.application) {
        const type = require(sourceRoot).default;
        console.log(`change ${type.target}`)
        ImsApplication.application.reInstall(type)
    }
});
export function watchAddon(type: Type<any>) {
    const context = visitor.visitType(type);
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    watch(`${addonAst.sourceRoot}`).on('all', (eventName, path) => {
        change.next(addonAst.sourceRoot)
    })
}