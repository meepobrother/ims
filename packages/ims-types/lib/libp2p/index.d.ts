
declare module 'libp2p' {
    import PeerBook from "peer-book";
    import { EventEmitter } from "events";
    import PeerId from "peer-id";
    import PeerInfo from "peer-info";
    export interface NodeOptions {
        modules?: {
            transport?: any[];
            streamMuxer?: any[];
            connEncryption?: any[];
            peerDiscovery?: any[];
            dht?: any;
        },
        config?: {
            peerDiscovery?: {
                mdns?: {
                    interval: number;
                    enabled: boolean;
                },
                webrtcStar?: {
                    interval: number;
                    enabled: boolean;
                },
                bootstrap?: {
                    interval: 10000,
                    enabled: false,
                    list: string[]
                }
            },
            relay?: {
                enabled: boolean;
                hop: {
                    enabled: boolean,
                    active: boolean
                }
            },
            dht?: {
                kBucketSize?: number,
                enabled?: boolean,
                enabledDiscovery?: boolean
            },
            EXPERIMENTAL?: {
                pubsub: boolean;
            }
        },
        peerInfo: PeerInfo;
    }
    export interface Connection { }
    class Node {
        peerBook: PeerBook;
        peerInfo: PeerInfo;
        constructor(options: NodeOptions);
        start(callback: (err?: Error) => any): void;
        stop(callback: (err?: Error) => any): void;
        isStarted(): boolean;
        dial(peer: PeerInfo, callback: (err?: Error, conn?: Connection) => any): void;
        dialFSM(peer: PeerInfo, protocol: string, callback: (err?: Error, connFSM?: any) => any): void;
        dialProtocol(peer: PeerInfo, protocol: string, callback: (err?: Error, conn?: Connection) => any): void;
        ping(peer: PeerInfo, options?: any, callback?: any): void;
        handle(path: string, callback: (protocol: any, conn: any) => any): any;
        unhandle(path: string): any;
        hangUp(peer: PeerInfo, callback: (err: Error) => any): any;
        on(name: 'start', fn: (err?: Error) => any): void;
        on(name: 'stop', fn: (err?: Error) => any): void;
        on(name: 'error', fn: (err?: Error) => any): void;
        on(name: 'peer:discovery', fn: (info: PeerInfo) => any): void;
        on(name: 'peer:disconnect', fn: (info: PeerInfo) => any): void;
        on(name: 'peer:connect', fn: (info: PeerInfo) => any): void;
    }
    export default Node;
}