import execa = require("execa");
export declare function gitAdd(cwd: string, ...files: string[]): execa.ExecaChildProcess;
