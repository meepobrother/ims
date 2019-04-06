import { makeDecorator, PropertyAst, PropertyContext } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm'
export interface OneToOne<T=any> {
    typeFunction: (type?: any) => ObjectType<T>;
    inverseSide: string | ((object: T) => any);
    options?: RelationOptions;
}
export const OneToOneMetadataKey = 'OneToOneMetadataKey'
const factory = makeDecorator<OneToOne>(OneToOneMetadataKey);
export const OneToOne = <T>(
    typeFunction: (type?: any) => ObjectType<T>,
    inverseSide: string | ((object: T) => any),
    options?: RelationOptions
) => {
    const opt: OneToOne<T> = {
        typeFunction,
        inverseSide,
        options
    }
    return factory(opt);
}
export function isOneToOnePropertyAst(val: PropertyAst): val is PropertyAst<OneToOne> {
    return val.metadataKey === OneToOneMetadataKey;
}
export class OneToOneAst extends PropertyContext<OneToOne>{ }
