/// <reference types="node" />
import { ImsDuplex } from './duplex';
export declare class DemoDuplex extends ImsDuplex {
    source: any[];
    _write(chunk: Buffer, encoding: string, callback: (error?: Error | null) => void): void;
    _read(size: number): void;
}
