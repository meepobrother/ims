import { ClassContext } from 'ims-decorator';
export declare const WatchMetadataKey = "WatchMetadataKey";
export interface WatchOptions {
    path: string[];
}
export declare const Watch: (metadataDef?: WatchOptions & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class WatchAst extends ClassContext<WatchOptions> {
}
