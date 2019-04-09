declare module 'multiaddr' {
    export interface Proto {
        code: number;
        size: number;
        name: string;
    }
    export interface Address {
        family: string;
        address: string;
        port: string;
    }
    export interface Options {
        family: string;
        host: string;
        transport: string;
        port: string;
    }
    class Multiaddr {
        buffer: Buffer;
        toString(): string;
        toJSON(): string;
        toOptions(): Options;
        inspect(): string;
        protos(): Proto[];
        protoCodes(): number[];
        protoNames(): string[];
        tuples(): [number, Buffer][];
        stringTuples(): [number, number | string][];
        encapsulate(addr: Multiaddr): Multiaddr;
        decapsulate(addr: Multiaddr): Multiaddr;
        getPeerId(): string;
        getPath(): string;
        equals(addr: Multiaddr): boolean;
        nodeAddress(): Address;
        isThinWaistAddress(addr: Multiaddr): boolean;
        static fromNodeAddress(addr: string, transport: string): Multiaddr;
        static protocols(): any;
        static isName(addr: Multiaddr): boolean;
        static resolve(addr: Multiaddr, callback: Function): boolean;
        static isMultiaddr(obj: any): obj is Multiaddr;
    }
    export default function (addr: string | Buffer | Multiaddr): Multiaddr;
}