import { Controller, HttpResult, Post, PostProperty, Get, GetProperty } from "ims-core";
import { parseInc } from "ims-adminer";
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
@Controller({
    path: "/install"
})
export class ImsIndex {
    @Post()
    setDatabase: PostProperty<[ISetDatabaseOptions], Promise<ISetDatabaseResult>>;
    @Post()
    setUser: PostProperty<[ISetUserOptions], Promise<ISetDatabaseResult>>;
    @Post()
    restart: PostProperty<[], Promise<ISetDatabaseResult>>;
    @Get()
    successRestart: GetProperty<[string], Promise<ISetDatabaseResult>>;
}
export default parseInc(ImsIndex);
