import { Options } from "execa";
interface RunScriptOptions extends Options {
    args: string[];
    npmClient: string;
    pkg: {
        location: string;
        name: string;
    };
    prefix?: string;
}
export declare function runScript(script: string, options: RunScriptOptions): Promise<import("execa").ExecaReturns>;
export declare function stream(script: string, options: RunScriptOptions): Promise<import("execa").ExecaReturns>;
export {};
