import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm'
export interface ManyToOne<T=any> {
    typeFunction: (type?: any) => ObjectType<T>;
    inverseSide: string | ((object: T) => any);
    options?: RelationOptions;
}
export const ManyToOneMetadataKey = 'ManyToOneMetadataKey'
const factory = makeDecorator<ManyToOne>(ManyToOneMetadataKey);
export const ManyToOne = <T>(
    typeFunction: (type?: any) => ObjectType<T>,
    inverseSide: string | ((object: T) => any),
    options?: RelationOptions
) => {
    const opt: ManyToOne<T> = {
        typeFunction,
        inverseSide,
        options
    }
    return factory(opt)
}
export function isManyToOnePropertyAst(val: PropertyAst): val is PropertyAst<ManyToOne> {
    return val.metadataKey === ManyToOneMetadataKey;
}
export class ManyToOneAst extends PropertyContext<ManyToOne>{ }
