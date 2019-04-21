import { PropertyAst, PropertyContext, Type } from 'ims-decorator';
export declare const InjectMetadataKey = "InjectMetadataKey";
export declare type Inject<T = any> = Type<T>;
export declare const Inject: (metadataDef?: Type<any> & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isInjectPropertyAst(val: PropertyAst): val is PropertyAst<Inject>;
export declare class InjectAst extends PropertyContext<Inject> {
    inject(): any;
}
