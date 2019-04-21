"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const peer_info_1 = __importDefault(require("peer-info"));
const peer_book_1 = __importDefault(require("peer-book"));
const createPeerId_1 = require("./createPeerId");
const node_1 = require("./node");
const path_1 = require("path");
const fs_extra_1 = __importDefault(require("fs-extra"));
async function bootstrap() {
    if (fs_extra_1.default.existsSync(path_1.join(process.cwd(), 'config/config.json'))) {
        const config = require(path_1.join(process.cwd(), 'config/config.json'));
        const peerId = await createPeerId_1.createPeerId('server');
        const peerInfo = new peer_info_1.default(peerId);
        const peerBook = new peer_book_1.default();
        peerInfo.multiaddrs.add(config.p2p);
        const node = new node_1.Libp2pBundle({
            peerInfo,
        }, config.list);
        node.on('start', () => {
            discoveredPeers.forEach(putAndDial);
            discoveredPeers = [];
        });
        let discoveredPeers = [];
        const noop = () => { };
        const putAndDial = (info) => {
            info = peerBook.put(info);
            if (!info.id.isEqual(peerInfo.id)) {
                if (!info.isConnected()) {
                    node.dial(peerInfo, noop);
                }
            }
        };
        node.on('peer:discovery', (info) => {
            if (node.isStarted()) {
                putAndDial(info);
            }
            else {
                discoveredPeers.push(info);
            }
        });
        node.on('peer:connect', peerInfo => {
            peerBook.put(peerInfo);
        });
        return new Promise((resolve, reject) => {
            node.start(() => {
                resolve(node);
            });
        });
    }
}
exports.bootstrap = bootstrap;
