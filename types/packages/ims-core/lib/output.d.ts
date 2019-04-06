import { PropertyContext } from 'ims-common';
export declare const OutputMetadataKey = "OutputMetadataKey";
export interface Output {
}
export declare const Output: (metadataDef?: Output & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => void;
export declare class OutputAst extends PropertyContext<Output> {
}
