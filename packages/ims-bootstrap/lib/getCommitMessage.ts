import execa = require("execa");
export function getCommitMessage(cwd: string, format = "%B") {
    return execa.stdout("git", ["log", "-1", `--pretty=format:${format}`], { cwd });
}
