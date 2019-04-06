import { ClassAst, ClassContext, Provider } from 'ims-common';
export declare const ModuleMetadataKey = "ModuleMetadataKey";
export interface Module {
    imports?: any[];
    providers?: Provider[];
    path?: string;
}
export declare const Module: (metadataDef?: Module & {
    sourceRoot?: string;
    imports?: any[];
    providers?: Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isModuleClassAst(val: ClassAst): val is ClassAst<Module>;
export declare class ModuleAst extends ClassContext<Module> {
}
