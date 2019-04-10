declare module 'multicodec' {
    export function addPrefix(multicodecStrOrCode: string | number, data: Buffer): Buffer;
    export function rmPrefix(data: Buffer): Buffer;
    export function getCodec(prefixedData: Buffer): string;
    export function getCode(prefixedData: Buffer): number;
    export function getCodeVarint(codecName: string): Buffer;
    export function getVarint(code: number): number[];
    export const print: { [key: number]: any };
    const key: { [key: string]: any }
    export default key;
}