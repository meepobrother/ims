export interface IConfig {
    system?: string;
    addons?: string;
    p2p?: string;
    api?: string;
    list?: string[];
    admin?: number[];
    memcached?: string[];
    db?: {
        host: string;
        port: number;
        username: string;
        password: string;
    };
}
export declare function getConfig(): IConfig;
export declare function setConfig(config: IConfig): void;