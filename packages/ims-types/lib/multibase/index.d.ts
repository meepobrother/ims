declare module 'multibase' {
    export default function (nameOrCode: string | number, buf: Buffer): Buffer;
    export function encode(nameOrCode: string | number, buf: Buffer): Buffer;
    export function decode(bufOrString: Buffer | string): Buffer;
    export function isEncoded(bufOrString: Buffer | string): boolean;
    export const names: any;
    export const codes: any;
}