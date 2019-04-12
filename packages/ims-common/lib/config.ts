export interface IConfig {
    system?: string,
    addons?: string,
    p2p?: string;
    api?: string;
    list?: string[];
    admin?: number[];
    memcached?: string[];
    db?: {
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
