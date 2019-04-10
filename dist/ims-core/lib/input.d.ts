import { PropertyAst, PropertyContext } from 'ims-decorator';
export declare const InputMetadataKey = "InputMetadataKey";
export interface Input {
    alis: string;
}
export declare const Input: (metadataDef?: Input & {
    sourceRoot?: string;
    imports?: any[];
    providers?: import("../../ims-decorator/lib").Provider<any>[];
}) => (target: any, propertyKey?: string | symbol, descriptor?: number | TypedPropertyDescriptor<any>) => any;
export declare class InputAst extends PropertyContext<Input> {
}
export declare function isInputPropertyAst(val: PropertyAst): val is PropertyAst<Input>;
