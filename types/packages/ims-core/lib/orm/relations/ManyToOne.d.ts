import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm';
export interface ManyToOne<T = any> {
    typeFunction: (type?: any) => ObjectType<T>;
    inverseSide: string | ((object: T) => any);
    options?: RelationOptions;
}
export declare const ManyToOneMetadataKey = "ManyToOneMetadataKey";
export declare const ManyToOne: <T>(typeFunction: (type?: any) => ObjectType<T>, inverseSide: string | ((object: T) => any), options?: RelationOptions) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isManyToOnePropertyAst(val: PropertyAst): val is PropertyAst<ManyToOne>;
export declare class ManyToOneAst extends PropertyContext<ManyToOne> {
}
