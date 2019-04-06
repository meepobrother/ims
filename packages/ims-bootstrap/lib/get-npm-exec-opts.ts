import log = require("npmlog");
export function getExecOpts(pkg: {
    location: string
}, registry?: string) {
    // execa automatically extends process.env
    const env: { npm_config_registry?: string } = {};
    if (registry) {
        env.npm_config_registry = registry;
    }
    log.silly("getExecOpts", pkg.location, registry);
    return {
        cwd: pkg.location,
        env,
        pkg,
    };
}
