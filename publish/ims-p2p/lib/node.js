"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const libp2p_1 = __importDefault(require("libp2p"));
const libp2p_tcp_1 = __importDefault(require("libp2p-tcp"));
const libp2p_mplex_1 = __importDefault(require("libp2p-mplex"));
const libp2p_secio_1 = __importDefault(require("libp2p-secio"));
const libp2p_bootstrap_1 = __importDefault(require("libp2p-bootstrap"));
const defaults_deep_1 = __importDefault(require("@nodeutils/defaults-deep"));
const KadDHT = require('libp2p-kad-dht');
const MulticastDNS = require('libp2p-mdns');
class Libp2pBundle extends libp2p_1.default {
    constructor(_options, bootstrapers) {
        const defaults = {
            modules: {
                transport: [libp2p_tcp_1.default],
                streamMuxer: [libp2p_mplex_1.default],
                connEncryption: [libp2p_secio_1.default],
                peerDiscovery: [MulticastDNS, libp2p_bootstrap_1.default],
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
        };
        super(defaults_deep_1.default(_options, defaults));
    }
}
exports.Libp2pBundle = Libp2pBundle;
