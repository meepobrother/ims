import { PostProperty, GetProperty } from "ims-core";
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
    setDatabase: PostProperty<[ISetDatabaseOptions], Promise<ISetDatabaseResult>>;
    setUser: PostProperty<[ISetUserOptions], Promise<ISetDatabaseResult>>;
    restart: PostProperty<[], Promise<ISetDatabaseResult>>;
    successRestart: GetProperty<[string], Promise<ISetDatabaseResult>>;
}
declare const _default: ImsIndex;
export default _default;
