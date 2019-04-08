import { PropertyAst, PropertyContext } from 'ims-decorator';
export declare const InjectMetadataKey = "InjectMetadataKey";
export declare type Inject = any;
export declare const Inject: (metadataDef?: any) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isInjectPropertyAst(val: PropertyAst): val is PropertyAst<Inject>;
export declare class InjectAst extends PropertyContext<Inject> {
    inject(): any;
}
