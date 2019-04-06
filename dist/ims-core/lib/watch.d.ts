import { ClassContext } from 'ims-common';
export declare const WatchMetadataKey = "WatchMetadataKey";
export interface WatchOptions {
    path: string[];
}
export declare const Watch: (metadataDef?: WatchOptions & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare class WatchAst extends ClassContext<WatchOptions> {
}
