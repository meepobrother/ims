import { TypeContext } from "ims-decorator";
import { Server, RequestQuery } from 'hapi';
export interface IRequestQuery extends RequestQuery {
    __args?: any[];
}
export declare function transformHttp(context: TypeContext, server: Server): void;
