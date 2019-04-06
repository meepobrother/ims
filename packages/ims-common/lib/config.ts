export interface IConfig {
    system: string,
    addons: string,
    port: number,
    admin: number[];
    db: {
        host: string,
        port: number,
        username: string,
        password: string
    }
}

let _config: IConfig;
export function getConfig() {
    return _config;
}
export function setConfig(config: IConfig) {
    _config = config;
}
