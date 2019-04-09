import Multiaddr from 'multiaddr';
import PeerId from 'peer-id'
PeerId.create((err, id) => {
    const b58String = id.toB58String();
    const addr = Multiaddr('/ip4/127.0.0.1/udp/1234/ipfs/' + b58String)
    const json = addr.toJSON();
    const str = addr.toString();
    const peerId = addr.getPeerId();
    debugger;
});
