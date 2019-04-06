export declare function getExecOpts(pkg: {
    location: string;
}, registry?: string): {
    cwd: string;
    env: {
        npm_config_registry?: string;
    };
    pkg: {
        location: string;
    };
};
