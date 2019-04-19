import PeerInfo from 'peer-info';
import PeerBook from 'peer-book';
import { createPeerId } from './createPeerId';
import { Libp2pBundle } from './node';
import { join } from 'path';
import fs from 'fs-extra';
import Libp2p from 'libp2p';
export async function bootstrap(): Promise<Libp2p> {
    if (fs.existsSync(join(process.cwd(), 'config/config.json'))) {
        const config = require(join(process.cwd(), 'config/config.json'))
        const peerId = await createPeerId('server');
        const peerInfo = new PeerInfo(peerId);
        const peerBook = new PeerBook();
        peerInfo.multiaddrs.add(config.p2p)
        const node = new Libp2pBundle({
            peerInfo,
        }, config.list);
        node.on('start', () => {
            discoveredPeers.forEach(putAndDial)
            discoveredPeers = []
        });
        let discoveredPeers = [];
        const noop = () => { }
        const putAndDial = (info: PeerInfo) => {
            info = peerBook.put(info)
            if (!info.id.isEqual(peerInfo.id)) {
                if (!info.isConnected()) {
                    node.dial(peerInfo, noop)
                }
            }
        }
        node.on('peer:discovery', (info) => {
            if (node.isStarted()) {
                putAndDial(info)
            } else {
                discoveredPeers.push(info)
            }
        });
        node.on('peer:connect', peerInfo => {
            peerBook.put(peerInfo);
        });
        return new Promise((resolve, reject) => {
            node.start(() => {
                resolve(node)
            });
        })
    }
}
