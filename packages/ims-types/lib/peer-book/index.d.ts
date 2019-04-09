declare module 'peer-book' {
    import PeerInfo from "peer-info";
    import PeerId from "peer-id";
    export type Peer = string | Buffer | PeerInfo | PeerId;
    class PeerBook {
        has(peer: Peer): boolean;
        put(peerInfo: PeerInfo, replace: boolean): PeerInfo;
        get(peer: Peer): any;
        getAll(): { [key: string]: PeerInfo };
        getAllArray(): PeerInfo[];
        getMultiaddrs(): any[];
        remove(peer: Peer): void;
    }
    export default PeerBook;
}