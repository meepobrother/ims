import { Controller, P2pMessage, P2p, Body, Get, Libp2p } from 'ims-core';
@Controller({
    path: '/'
})
export class ImsAdminerInc {
    @P2p('demo')
    demo(@Body() msg: P2pMessage): P2p {
        console.log(msg)
        return {
            topic: '',
            data: msg
        }
    }

    @Get()
    async testp2p(@P2p() node: Libp2p) {
        node.pubsub.publish('/demo', Buffer.from('hellow'), () => {
            console.log('publish success')
        });
        return {
            path: 'testP2p'
        }
    }
}