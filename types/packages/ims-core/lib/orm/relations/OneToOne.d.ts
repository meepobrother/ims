import { PropertyAst, PropertyContext } from 'ims-decorator';
import { ObjectType, RelationOptions } from 'typeorm';
export interface OneToOne<T = any> {
    typeFunction: (type?: any) => ObjectType<T>;
    inverseSide: string | ((object: T) => any);
    options?: RelationOptions;
}
export declare const OneToOneMetadataKey = "OneToOneMetadataKey";
export declare const OneToOne: <T>(typeFunction: (type?: any) => ObjectType<T>, inverseSide: string | ((object: T) => any), options?: RelationOptions) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isOneToOnePropertyAst(val: PropertyAst): val is PropertyAst<OneToOne>;
export declare class OneToOneAst extends PropertyContext<OneToOne> {
}
