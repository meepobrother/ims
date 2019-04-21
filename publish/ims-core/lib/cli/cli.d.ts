import { ClassContext, ClassAst } from "ims-decorator";
export declare const CliMetadataKey = "CliMetadataKey";
export interface CliOptions {
    name?: string;
    version?: string;
    commands?: any[];
}
export declare const Cli: (metadataDef?: CliOptions & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export interface Cli<O, R> {
    action(options: O): R;
}
export declare function isCliClassAst(val: ClassAst): val is ClassAst<CliOptions>;
export declare class CliClassAst extends ClassContext<CliOptions> {
}
