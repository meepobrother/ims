import { Controller, Post, PostProperty } from "ims-core";
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
@Controller({
    path: "/install"
})
export class ImsIndex {
    @Post()
    setDatabase: PostProperty<[ISetDatabaseOptions], Promise<ISetDatabaseResult>>;
    @Post()
    setUser: PostProperty<[any], any>;
    @Post()
    restart: PostProperty<[], any>;
}
export default parseInc(ImsIndex);
