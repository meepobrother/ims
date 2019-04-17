import { EventEmitter } from 'events';
import PeerBook from 'peer-book';
import PeerInfo from 'peer-info';
import BlockService from 'ipfs-block-service';
import Ipld from 'ipld';
export interface ImsOptions { }
export class Ims extends EventEmitter {
    private _peerInfoBook: PeerBook = new PeerBook();
    private _peerInfo: PeerInfo;
    private _blockService: BlockService;
    private _ipld: Ipld;
    constructor(options: ImsOptions) {
        super();
    }

    init() { }
    preStart() { }
    start() { }
    stop() { }
    shutdown() { }
    isOnline() { }

    static create(options: ImsOptions): Ims {
        return new Ims(options);
    }
}
