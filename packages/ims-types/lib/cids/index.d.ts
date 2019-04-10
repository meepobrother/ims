declare module 'cids' {
    class CID {
        version: number;
        codec: string;
        multihash: Buffer;
        multibaseName: string;
        readonly buffer: Buffer;
        readonly prefix: Buffer;
        constructor(version: string | Buffer, codec: string, multihash: Buffer, multibaseName?: string);
        toV0(): CID;
        toV1(): CID;
        toBaseEncodedString(base?: string): string;
        toString(base?: string): string;
        toJSON(): { codec: string, version: string, hash: Buffer };
        equals(other: CID): boolean;
        static validateCID(other: any): void;
        static isCID(obj: any): obj is CID;
        static codecs: any;
    }

    export default CID;
}