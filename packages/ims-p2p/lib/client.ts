import libp2p from 'libp2p';
const TCP = require('libp2p-tcp')
const Mplex = require('libp2p-mplex')
const SECIO = require('libp2p-secio')
import PeerInfo from 'peer-info';
const MulticastDNS = require('libp2p-mdns')
import { waterfall, parallel } from 'async';
const defaultsDeep = require('@nodeutils/defaults-deep')
const bootstrapers = [
    '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
    '/ip4/104.236.176.52/tcp/4001/p2p/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z',
    '/ip4/104.236.179.241/tcp/4001/p2p/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
    '/ip4/162.243.248.213/tcp/4001/p2p/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
    '/ip4/128.199.219.111/tcp/4001/p2p/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
    '/ip4/104.236.76.40/tcp/4001/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
    '/ip4/178.62.158.247/tcp/4001/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
    '/ip4/178.62.61.185/tcp/4001/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
    '/ip4/104.236.151.122/tcp/4001/p2p/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx'
]
class MyBundle extends libp2p {
    constructor(_options) {
        const defaults = {
            modules: {
                transport: [TCP],
                streamMuxer: [Mplex],
                connEncryption: [SECIO],
                peerDiscovery: [MulticastDNS]
            },
            config: {
                peerDiscovery: {
                    mdns: {
                        interval: 10000,
                        enabled: true
                    },
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

function createNode(callback) {
    let node
    waterfall([
        (cb) => PeerInfo.create(cb),
        (peerInfo: PeerInfo, cb) => {
            const id = peerInfo.id.toB58String();
            console.log(id)
            peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0')
            node = new MyBundle({
                peerInfo
            })
            node.start(cb)
        }
    ], (err) => callback(err, node))
}
const map: Set<string> = new Set();
parallel([
    (cb) => createNode(cb)
], (err, nodes) => {
    if (err) { throw err }
    const node1 = nodes[0];
})