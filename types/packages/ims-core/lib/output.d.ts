import { PropertyContext } from 'ims-decorator';
export declare const OutputMetadataKey = "OutputMetadataKey";
export interface Output {
}
export declare const Output: (metadataDef?: Output & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class OutputAst extends PropertyContext<Output> {
}
