import { PropertyAst, PropertyContext } from 'ims-common';
export declare const InjectMetadataKey = "InjectMetadataKey";
export declare type Inject = any;
export declare const Inject: (metadataDef?: any) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isInjectPropertyAst(val: PropertyAst): val is PropertyAst<Inject>;
export declare class InjectAst extends PropertyContext<Inject> {
    inject(): any;
}
