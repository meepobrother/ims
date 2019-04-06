import { makeDecorator, ClassAst, ClassContext, Provider, } from 'ims-decorator';
export const ModuleMetadataKey = 'ModuleMetadataKey'
export interface Module {
    imports?: any[];
    providers?: Provider[];
    path?: string;
}
export const Module = makeDecorator<Module>(ModuleMetadataKey);
export function isModuleClassAst(val: ClassAst): val is ClassAst<Module> {
    return val.metadataKey === ModuleMetadataKey;
}
export class ModuleAst extends ClassContext<Module> { }
