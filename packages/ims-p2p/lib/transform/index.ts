import { transformContentRouting } from './contentRouting'
import { transformP2p } from './p2p'
import { transformProtocol } from './protocol'
import { transformPubsub } from './pubsub'
import { TypeContext } from 'ims-decorator';
import Libp2p from 'libp2p';
export function transform(context: TypeContext, options: Libp2p) {
    transformContentRouting(context, options)
    transformP2p(context, options)
    transformProtocol(context, options)
    transformPubsub(context, options)
}
