declare module 'peer-id' {
    export interface PeerIdJson {
        id: string;
        privKey: string;
        pubKey: string;
    }
    class PeerId {
        readonly id: any;
        // doto
        readonly privKey: any;
        // doto
        readonly pubKey: any;
        constructor(
            id: Buffer,
            // doto
            privKey: any,
            // doto
            pubKey: any
        );
        // todo
        marshalPubKey(): any;
        // todo
        marshalPrivKey(): any;
        toPrint(): string;
        toJSON(): PeerIdJson;
        toHexString(): string;
        toBytes(): Buffer;
        toB58String(): string;
        isEqual(id: Buffer | PeerId): boolean;
        isValid(cb: (err?: Error) => any): void;
        static isPeerId(obj: any): obj is PeerId;
        static create(callback: (err?: Error, peerId?: PeerId) => any): void;
        static create(opts: { bits: number }, callback: (err?: Error, peerId?: PeerId) => any): void;
        static createFromHexString(str: string): PeerId;
        static createFromBytes(buf: Buffer): PeerId;
        static createFromB58String(str: string): PeerId;
        static createFromPubKey(
            // todo
            key: any,
            callback: (err?: Error, peerId?: PeerId) => any
        ): void;
        static createFromPrivKey(
            // todo
            key: any,
            callback: (err?: Error, peerId?: PeerId) => any
        ): void;
        static createFromJSON(
            obj: PeerIdJson,
            callback: (err?: Error, peerId?: PeerId) => any
        ): void;
    }
    export default PeerId;
}
