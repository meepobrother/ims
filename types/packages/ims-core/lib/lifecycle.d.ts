import { MethodContext } from 'ims-decorator';
export declare const OnReadyMetadateKey = "OnReadyMetadateKey";
export interface OnReady {
}
export declare const OnReady: (metadataDef?: OnReady & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class OnReadyAst extends MethodContext<OnReady> {
}
