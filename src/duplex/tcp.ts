import { ImsDuplex, DuplexOptions } from './duplex';
import net from 'net';
export class ImsDuplexTcp extends ImsDuplex {
    source: Buffer[] = [];
    constructor(private socket: net.Socket, options?: DuplexOptions) {
        super(options);
        socket.on('data', (data: Buffer) => {
            this.source.push(data)
        });
    }
    _write(chunk: Buffer, encoding: string, callback: (error?: Error | null) => void): void {
        this.socket.write(chunk, encoding, callback)
    }
    _read(size: number): void {
        let data = this.source.shift();
        if (data) this.push(data)
    }
}