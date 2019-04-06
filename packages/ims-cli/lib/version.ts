import { Command, Version } from 'ims-core';
@Command({
    name: 'version',
    alis: 'v'
})
export class ImsCommandVersion {
    @Version()
    version: string;
    async run() {
        console.log(`${this.version}`)
    }
    static instance: any;
    static create() {
        if (this.instance) return this.instance;
        this.instance = new ImsCommandVersion();
        return this.instance;
    }
}