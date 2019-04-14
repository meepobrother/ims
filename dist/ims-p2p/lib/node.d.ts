import libp2p, { NodeOptions } from 'libp2p';
export declare class Libp2pBundle extends libp2p {
    constructor(_options: NodeOptions, bootstrapers: string[]);
}
