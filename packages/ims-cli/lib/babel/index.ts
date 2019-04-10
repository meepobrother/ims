import { Command, Input } from 'ims-core';
@Command({
    name: 'babel'
})
export class ImsBabel {
    @Input()
    dir: string;

    @Input()
    watch: boolean;

    @Input()
    outDir: string;

    run() { 
        
    }
}