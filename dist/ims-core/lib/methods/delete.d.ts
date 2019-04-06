import { MethodAst } from 'ims-common';
export declare const DeleteMetadataKey = "DeleteMetadataKey";
import { HttpMethodContext, IHttpMethod } from './method';
export interface Delete extends IHttpMethod {
}
export declare const Delete: (metadataDef?: Delete & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare function isDeleteMethodAst(val: MethodAst): val is MethodAst<Delete>;
export declare class DeleteAst extends HttpMethodContext<Delete> {
}
