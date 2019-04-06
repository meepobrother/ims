/// <reference types="node" />
import { ImsDuplex, DuplexOptions } from './duplex';
import net from 'net';
export declare class ImsDuplexTcp extends ImsDuplex {
    private socket;
    source: Buffer[];
    constructor(socket: net.Socket, options?: DuplexOptions);
    _write(chunk: Buffer, encoding: string, callback: (error?: Error | null) => void): void;
    _read(size: number): void;
}
