import { MethodAst } from 'ims-decorator';
export declare const DeleteMetadataKey = "DeleteMetadataKey";
import { HttpMethodContext, IHttpMethod } from './method';
export interface Delete extends IHttpMethod {
}
export declare const Delete: (metadataDef?: Delete & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare function isDeleteMethodAst(val: MethodAst): val is MethodAst<Delete>;
export declare class DeleteAst extends HttpMethodContext<Delete> {
}
