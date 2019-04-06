import execa = require("execa");
export function gitTag(cwd:string, tagName:string) {
    return execa("git", ["tag", tagName, "-m", tagName], { cwd });
}
