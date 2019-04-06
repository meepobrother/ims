import chalk = require("chalk");
import execa = require("execa");
import logTransformer = require("strong-log-transformer");

// bookkeeping for spawned processes
let children = 0;

// when streaming children are spawned, use this color for prefix
const colorWheel = ["cyan", "magenta", "blue", "yellow", "green", "red"];
const NUM_COLORS = colorWheel.length;

export function exec(command: string, args: string[], opts: execa.Options) {
    const options = Object.assign({ stdio: "pipe" }, opts);
    const spawned = spawnProcess(command, args, options);
    return wrapError(spawned);
}

export function execSync(command: string, args: string[], opts: execa.SyncOptions) {
    return execa.sync(command, args, opts).stdout;
}

export function spawn(command: string, args: string[], opts: execa.Options) {
    const options = Object.assign({}, opts, { stdio: "inherit" });
    const spawned = spawnProcess(command, args, options);
    return wrapError(spawned);
}

// istanbul ignore next
export function spawnStreaming(command: string, args: string[], opts: execa.Options, prefix?: string) {
    const options = Object.assign({}, opts);
    options.stdio = ["ignore", "pipe", "pipe"];

    const colorName = colorWheel[children % NUM_COLORS];
    const color = chalk[colorName];
    const spawned = spawnProcess(command, args, options);

    const stdoutOpts: { tag?: string } = {};
    const stderrOpts: { tag?: string } = {}; // mergeMultiline causes escaped newlines :P

    if (prefix) {
        stdoutOpts.tag = `${color.bold(prefix)}:`;
        stderrOpts.tag = `${color(prefix)}:`;
    }
    // Avoid "Possible EventEmitter memory leak detected" warning due to piped stdio
    if (children > process.stdout.listenerCount("close")) {
        process.stdout.setMaxListeners(children);
        process.stderr.setMaxListeners(children);
    }
    spawned.stdout.pipe(logTransformer(stdoutOpts)).pipe(process.stdout);
    spawned.stderr.pipe(logTransformer(stderrOpts)).pipe(process.stderr);
    return wrapError(spawned);
}

export function getChildProcessCount(): number {
    return children;
}

export function spawnProcess(command: string, args: string[], opts: execa.Options & { pkg?: string }) {
    children += 1;
    const child: execa.ExecaChildProcess & { pkg?: string } = execa(command, args, opts);
    const drain = (code, signal) => {
        children -= 1;
        // don't run repeatedly if this is the error event
        if (signal === undefined) {
            child.removeListener("exit", drain);
        }
    };
    child.once("exit", drain);
    child.once("error", drain);
    if (opts.pkg) {
        child.pkg = opts.pkg;
    }
    return child;
}

export function wrapError(spawned: execa.ExecaChildProcess & { pkg?: string }) {
    if (spawned.pkg) {
        return spawned.catch((err: Error & { pkg?: string, code?: string }) => {
            // istanbul ignore else
            if (err.code) {
                // log non-lerna error cleanly
                err.pkg = spawned.pkg;
            }
            throw err;
        });
    }
    return spawned;
}
