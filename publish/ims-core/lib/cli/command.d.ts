import { ClassContext, ClassAst } from "ims-decorator";
export declare const CommandMetadataKey = "CommandMetadataKey";
export interface CommandOptions {
    name: string | ReadonlyArray<string>;
    description: string;
    example: {
        command: string;
        description: string;
    };
}
export declare const Command: (metadataDef?: CommandOptions & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export interface Command<O, R> {
    action(options: O): R;
}
export declare function isCommandClassAst(val: ClassAst): val is ClassAst<CommandOptions>;
export declare class CommandClassAst extends ClassContext<CommandOptions> {
}
