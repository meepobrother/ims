import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export interface ChildEntity { }
export const ChildEntityMetadataKey = 'ChildEntityMetadataKey'
export const ChildEntity = makeDecorator<ChildEntity>(ChildEntityMetadataKey);
export function isChildEntityClassAst(val: ClassAst): val is ClassAst<ChildEntity> {
    return val.metadataKey === ChildEntityMetadataKey;
}
export class ChildEntityAst extends ClassContext<ChildEntity>{ }
