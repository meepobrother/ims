import { Type } from "ims-decorator";
import { visitor } from "ims-common";
import { Subject } from 'rxjs'
import { watch } from 'chokidar';
import { AddonMetadataKey, AddonAst } from "ims-core";
import { ImsApplication } from "../transform/application";
import { throttleTime } from "rxjs/operators";
const change = new Subject();
change.pipe(
    throttleTime(1000)
).subscribe((root: string) => {
    if (ImsApplication.application) {
        const type = require(root).default;
        ImsApplication.application.reInstall(type);
    }
});
export function watchAddon(type: Type<any>) {
    const context = visitor.visitType(type);
    const addonAst = context.getClass(AddonMetadataKey) as AddonAst;
    watch(`${addonAst.sourceRoot}`).on('all', (eventName, path) => {
        change.next(addonAst.sourceRoot)
    })
}