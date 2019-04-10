declare module 'multihashes' {
    export const names: { [key: string]: number };
    export const codes: { [key: number]: string }
    export const defaultLengths: { [key: number]: number };
    export function toHexString(hash: Buffer): string;
    export function fromHexString(hash: string): Buffer;
    export function toB58String(hash: Buffer): string;
    export function fromB58String(hash: string | Buffer): Buffer;
    export function decode(buf: Buffer): { code: number, name: string, length: number, digest: Buffer }
    export function encode(digest: Buffer, code: string | number, length: number): Buffer;
    export function coerceCode(name: string | number): number;
    export function isAppCode(code: number): boolean;
    export function isValidCode(code: number): boolean;
    export function validate(multihash: Buffer): any;
    export function prefix(multihash: Buffer): any;
}