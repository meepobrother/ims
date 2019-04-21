export interface ISetDatabaseOptions {
    username: string;
    host: string;
    port: number;
    password: string;
}
export interface ISetDatabaseResult<T = any> {
    code: number;
    message: string;
    data?: T;
}
export interface ISetUserOptions {
    username: string;
    password: string;
}
export declare class ImsIndex {
    lockFile: string;
    setDatabase(body: ISetDatabaseOptions): Promise<ISetDatabaseResult>;
    setUser(body: ISetUserOptions): Promise<ISetDatabaseResult>;
    restart(): Promise<ISetDatabaseResult>;
    successRestart(id: string): Promise<ISetDatabaseResult>;
}
