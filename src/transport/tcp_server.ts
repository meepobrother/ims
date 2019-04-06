import net from 'net';
import { ImsDuplexTcp } from '../duplex/tcp';
export class ImsTransportTcp {
    connections: Set<ImsDuplexTcp> = new Set();
    createServer(port?: number, hostname?: string, listeningListener?: () => void) {
        const server = net.createServer((socket: net.Socket) => {
            const duplex = new ImsDuplexTcp(socket);
            duplex.on('data', (data) => {
                console.log(data.toString('utf8'))
            });
            this.connections.add(duplex);
        });
        server.listen(port, hostname, listeningListener)
    }
    createClient(port: number, host?: string, connectionListener?: () => void) {
        const socket = net.connect(port, host, connectionListener)
        return new ImsDuplexTcp(socket);
    }
}