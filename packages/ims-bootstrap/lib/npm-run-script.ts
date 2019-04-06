const log = require("npmlog");
import { exec, spawnStreaming } from "./child_process";
import { getExecOpts } from './get-npm-exec-opts'
import { Options } from "execa";

interface RunScriptOptions extends Options {
    args: string[],
    npmClient: string,
    pkg: { location: string, name: string },
    prefix?: string
}
export function runScript(script: string, options: RunScriptOptions) {
    let { args, pkg, reject, npmClient } = options;
    if (typeof reject === 'undefined') reject = true;
    reject == !!reject;
    log.silly("npmRunScript", script, args, pkg.name);
    const argv = ["run", script, ...args];
    const opts = makeOpts(pkg, reject);
    return exec(npmClient, argv, opts);
}
export function stream(script: string, options: RunScriptOptions) {
    let { args, pkg, reject, npmClient, prefix } = options;
    if (typeof reject === 'undefined') reject = true;
    reject == !!reject;
    log.silly("npmRunScript.stream", [script, args, pkg.name]);
    const argv: string[] = ["run", script, ...args];
    const opts = makeOpts(pkg, reject);
    return spawnStreaming(npmClient, argv, opts, prefix && pkg.name);
}

function makeOpts(pkg: {
    location: string,
    name: string
}, reject: boolean) {
    return Object.assign(getExecOpts(pkg), {
        reject: !!reject,
    });
}

const root = process.cwd();
runScript('dll', {
    args: [],
    npmClient: 'npm',
    pkg: {
        location: root,
        name: 'demo'
    }
})