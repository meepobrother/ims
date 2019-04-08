export interface IConfig {
    system: string;
    addons: string;
    port: number;
    admin: number[];
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
    };
}
export declare function getConfig(): IConfig;
export declare function setConfig(config: IConfig): void;
