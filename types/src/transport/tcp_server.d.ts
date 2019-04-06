import { ImsDuplexTcp } from '../duplex/tcp';
export declare class ImsTransportTcp {
    connections: Set<ImsDuplexTcp>;
    createServer(port?: number, hostname?: string, listeningListener?: () => void): void;
    createClient(port: number, host?: string, connectionListener?: () => void): ImsDuplexTcp;
}
