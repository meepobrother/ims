import { ClassContext, ClassAst, ParserAstContext } from 'ims-decorator';
export declare const StoreMetadataKey = "StoreMetadataKey";
export interface Store {
    name: string;
}
export declare const Store: (metadataDef?: Store & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class StoreAst extends ClassContext<Store> {
    name: string;
    constructor(ast: ClassAst, context: ParserAstContext);
}
export declare function isStoreClassAst(val: ClassAst): val is ClassAst<Store>;
