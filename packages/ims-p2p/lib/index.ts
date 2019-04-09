import libp2p from 'libp2p';
import TCP from 'libp2p-tcp';
import Mplex from 'libp2p-mplex';
import SECIO from 'libp2p-secio';
import PeerInfo from 'peer-info';
import { Multiaddr } from 'multiaddr';
import Bootstrap from 'libp2p-bootstrap';
import { waterfall } from 'async';
import defaultsDeep from '@nodeutils/defaults-deep';

// Find this list at: https://github.com/ipfs/js-ipfs/blob/master/src/core/runtime/config-nodejs.json
const bootstrapers = [
    '/ip4/0.0.0.0/tcp/10336/p2p/QmT3oRfkS4orcGT6kTzPzKgG7arM1KfugKgzVtg1vmtBGt'
]

class MyBundle extends libp2p {
    constructor(_options) {
        const defaults = {
            modules: {
                transport: [TCP],
                streamMuxer: [Mplex],
                connEncryption: [SECIO],
                peerDiscovery: [Bootstrap]
            },
            config: {
                peerDiscovery: {
                    bootstrap: {
                        interval: 2000,
                        enabled: true,
                        list: bootstrapers
                    }
                }
            }
        }
        super(defaultsDeep(_options, defaults))
    }
}

let node
const map: Set<string> = new Set();
const map2: Set<string> = new Set();

waterfall([
    (cb) => PeerInfo.create(cb),
    (peerInfo: PeerInfo, cb) => {
        peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/10338')
        peerInfo.multiaddrs.forEach((ma: Multiaddr) => {
            console.log(`${ma.toString()}/p2p/${peerInfo.id.toB58String()}`)
        })
        node = new MyBundle({
            peerInfo
        })
        node.start(cb)
    }
], (err) => {
    if (err) { throw err }
    node.on('peer:discovery', (peer) => {
        map.add(peer.id.toB58String());
        console.log(`peer:discovery ${map.size}`, map);
        node.dial(peer, () => { });
    });
    node.on('peer:connect', (peer) => {
        map2.add(peer.id.toB58String());
        console.log(`peer:connect ${map2.size}`);
    });
})