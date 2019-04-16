import PeerBook from "peer-book";
import { EventEmitter } from "events";
import PeerId from "peer-id";
import PeerInfo from "peer-info";
export interface NodeOptions {
    wsStarIgnoreErrors?: any;
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
                interval?: number;
                enabled?: boolean;
            },
            webrtcStar?: {
                interval: number;
                enabled: boolean;
            },
            bootstrap?: {
                interval?: number,
                enabled?: boolean,
                list?: string[]
            },
            websocketStar?: {
                enabled?: boolean;
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
    peerInfo?: PeerInfo;
    peerBook?: PeerBook;
}
export interface Connection { }
export interface Message {
    from: string,
    seqno: Buffer,
    data: Buffer,
    topicIDs: Array<string>
}
export interface Libp2pPubsub {
    subscribe(
        topic: string,
        handler: (msg: Message) => any,
        options?: {
            discover: boolean
        },
        callback?: (err?: Error) => any
    ): any;
    unsubscribe(
        topic: string,
        handler: (msg: Message) => any,
        callback?: (err?: Error) => any
    ): any;
    publish(topic: string, data: Buffer, callback?: (err?: Error) => any): any;
    ls(
        callback?: (err?: Error, list?: string[]) => any
    ): any;
    peers(
        topic: string,
        callback?: (err?: Error, list?: string[]) => any
    ): any;
}
interface Libp2pContentRouting {
    provide(key: Buffer, callback: Function): any;
    findProviders(key: Buffer, options: { maxTimeout: number, maxNumProviders: number }, callback: Function): any;
}
interface Libp2pStats {
    peers(): string[];
}
declare class Libp2p {
    peerBook: PeerBook;
    peerInfo: PeerInfo;
    pubsub: Libp2pPubsub;
    contentRouting: Libp2pContentRouting;
    stats: Libp2pStats;
    constructor(options: NodeOptions);
    start(callback: (err?: Error) => any): void;
    stop(callback: (err?: Error) => any): void;
    isStarted(): boolean;
    dial(peer: PeerInfo, callback: (err?: Error, conn?: Connection) => any): void;
    dialFSM(peer: PeerInfo, protocol: string, callback: (err?: Error, connFSM?: any) => any): void;
    dialProtocol(peer: PeerInfo, protocol: string, callback: (err?: Error, conn?: Connection) => any): void;
    ping(peer: PeerInfo, options?: any, callback?: any): void;
    handle(path: string, callback: (protocol: any, conn: any) => any, matchFunc?: any): any;
    unhandle(path: string): any;
    hangUp(peer: PeerInfo, callback: (err: Error) => any): any;
    on(name: 'start', fn: (err?: Error) => any): void;
    on(name: 'stop', fn: (err?: Error) => any): void;
    on(name: 'error', fn: (err?: Error) => any): void;
    on(name: 'peer:discovery', fn: (info: PeerInfo) => any): void;
    on(name: 'peer:disconnect', fn: (info: PeerInfo) => any): void;
    on(name: 'peer:connect', fn: (info: PeerInfo) => any): void;
}
export default Libp2p;