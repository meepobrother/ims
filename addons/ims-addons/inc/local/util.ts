import { AddonAst, AddonMetadataKey } from 'ims-core';
import { TypeContext, visitor } from 'ims-common';
export function getTemplate(context: TypeContext) {
    const appAst = context.getClass<AddonAst>(AddonMetadataKey);
    const template = appAst.getTemplate();
    const typeorm = appAst.getTypeorm();
    const incs = appAst.getIncs()
    debugger;
}
import ImsAddons from '../..';
getTemplate(visitor.visitType(ImsAddons));
