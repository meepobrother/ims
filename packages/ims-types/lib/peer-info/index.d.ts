
declare module 'peer-info' {
    import { Multiaddr } from 'multiaddr';
    import PeerId from 'peer-id'
    type Ma = string | Buffer | Multiaddr;
    export interface MultiaddrSet {
        readonly size: number;
        add(ma: Ma): void;
        addSafe(ma: Ma): void;
        toArray(): Multiaddr[];
        forEach(fn: (ma: Multiaddr) => any): void;
        filterBy(maFmt: any): Multiaddr[];
        has(ma: Ma): boolean;
        delete(ma: Ma): void;
        replace(existing: Ma | Ma[], fresh: Ma | Ma[]): void;
        clear(): void;
        distinct(): any;
    }
    class PeerInfo {
        id: PeerId;
        multiaddrs: MultiaddrSet;
        constructor(peerId: PeerId);
        // todo
        connect(ma: any): void;
        disconnect(): void;
        isConnected(): boolean;
        static create(callback: (err?: Error, info?: PeerInfo) => any): void;
        static create(peerId: PeerId, callback: (err?: Error, info?: PeerInfo) => any): void;
        static isPeerInfo(info: any): info is PeerInfo;
    }
    export default PeerInfo;
}