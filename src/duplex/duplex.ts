import { Duplex, DuplexOptions } from 'stream';
export abstract class ImsDuplex extends Duplex {
    abstract _write(chunk: Buffer, encoding: string, callback: (error?: Error | null) => void): void;
    abstract _read(size: number): void;
}
export { DuplexOptions }