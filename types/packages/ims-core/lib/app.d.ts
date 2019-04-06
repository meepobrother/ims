import { ClassAst, ClassContext, ParserAstContext, TypeContext } from 'ims-common';
export declare const AppMetadataKey = "AppMetadataKey";
export interface App {
    name?: string;
    version?: string;
    addons?: any[] | object;
    commands?: any[] | object;
    providers?: any[] | object;
    dev?: boolean;
}
export declare const App: (metadataDef?: App & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isAppClassAst(val: ClassAst): val is ClassAst<App>;
export declare class AppAst extends ClassContext<App> {
    name: string;
    version: string;
    addons: TypeContext[];
    commands: TypeContext[];
    dev: boolean;
    constructor(ast: any, context: ParserAstContext);
}
