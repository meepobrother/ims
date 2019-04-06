import { ImsDuplex } from './duplex';
import { createWriteStream } from 'fs';
import { join } from 'path';

export class DemoDuplex extends ImsDuplex {
    source: any[] = [];
    _write(chunk: Buffer, encoding: string, callback: (error?: Error | null) => void): void {
        this.source.push(chunk);
        callback();
    }
    _read(size: number): void {
        let data = this.source.shift();
        if (data) {
            this.push(data)
        }
    }
}
const dup = new DemoDuplex();
dup.pipe(createWriteStream(join(__dirname, '1.txt')))
let i = 0;
dup.on('data', (data: Buffer) => {
    i++;
    console.log(i, data.toString('utf8'))
});
dup.write(Buffer.from('test'))
dup.write(Buffer.from('test1'))
dup.write(Buffer.from('test2'))
