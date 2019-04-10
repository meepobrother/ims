import libp2p from 'libp2p';
import TCP from 'libp2p-tcp';
import Mplex from 'libp2p-mplex';
import SECIO from 'libp2p-secio';
import Bootstrap from 'libp2p-bootstrap';
import defaultsDeep from '@nodeutils/defaults-deep';
const KadDHT = require('libp2p-kad-dht')
const MulticastDNS = require('libp2p-mdns')
export class MyBundle extends libp2p {
    constructor(_options, bootstrapers: string[]) {
        const defaults = {
            modules: {
                transport: [TCP],
                streamMuxer: [Mplex],
                connEncryption: [SECIO],
                peerDiscovery: [MulticastDNS, Bootstrap],
                dht: KadDHT
            },
            config: {
                peerDiscovery: {
                    mdns: {
                        enabled: true
                    },
                    bootstrap: {
                        enabled: true,
                        list: bootstrapers
                    }
                },
                dht: {
                    kBucketSize: 20
                },
                EXPERIMENTAL: {
                    pubsub: true
                }
            }
        }
        super(defaultsDeep(_options, defaults))
    }
}