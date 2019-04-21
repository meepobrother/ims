/// <reference types="node" />
export interface IProtons<T = any> {
    encode: (val: T, buf?: Buffer, offset?: number) => Buffer;
    decode: (val: Buffer, offset?: number, end?: number) => T;
}
export declare function protons<T extends object>(val: string): {
    [key in keyof T]: IProtons<T[key]>;
};
export default protons;
