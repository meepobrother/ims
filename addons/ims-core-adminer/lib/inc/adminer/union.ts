import { Controller, P2p, P2pProperty, Get } from 'ims-core'

@Controller({
    path: '/adminer/union'
})
export class ImsCoreAdminerUnion {
    @P2p()
    p2p: P2pProperty;

    infos: any[] = [];

    constructor() {}

    @Get()
    getUnionList() {
        return this.infos;
    }
}
