import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
export interface ManyToMany {
    typeFunction: (type?: any) => any,
    options: any
}
export const ManyToManyMetadataKey = 'ManyToManyMetadataKey'
export const ManyToMany = makeDecorator<ManyToMany>(ManyToManyMetadataKey);
export function isManyToManyPropertyAst(val: PropertyAst): val is PropertyAst<ManyToMany> {
    return val.metadataKey === ManyToManyMetadataKey;
}
export class ManyToManyAst extends PropertyContext<ManyToMany>{ }
