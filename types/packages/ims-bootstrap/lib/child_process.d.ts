/// <reference types="node" />
import execa = require("execa");
export declare function exec(command: string, args: string[], opts: execa.Options): Promise<execa.ExecaReturns>;
export declare function execSync(command: string, args: string[], opts: execa.SyncOptions): string;
export declare function spawn(command: string, args: string[], opts: execa.Options): Promise<execa.ExecaReturns>;
export declare function spawnStreaming(command: string, args: string[], opts: execa.Options, prefix?: string): Promise<execa.ExecaReturns>;
export declare function getChildProcessCount(): number;
export declare function spawnProcess(command: string, args: string[], opts: execa.Options & {
    pkg?: string;
}): import("child_process").ChildProcess & execa.ExecaChildPromise & Promise<execa.ExecaReturns> & {
    pkg?: string;
};
export declare function wrapError(spawned: execa.ExecaChildProcess & {
    pkg?: string;
}): Promise<execa.ExecaReturns>;
