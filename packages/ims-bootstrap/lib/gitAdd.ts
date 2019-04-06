import execa = require("execa");
export function gitAdd(cwd: string, ...files: string[]) {
    return execa("git", ["add", ...files], { cwd });
}
