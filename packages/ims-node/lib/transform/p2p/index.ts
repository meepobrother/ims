import { transformContentRouting } from './contentRouting'
import { transformP2p } from './p2p'
import { transformProtocol } from './protocol'
import { transformPubsub } from './pubsub'
import { TypeContext } from 'ims-decorator';
import { TransformOptions } from '../type'

export default function transform(context: TypeContext, options: TransformOptions) {
    transformContentRouting(context, options)
    transformP2p(context, options)
    transformProtocol(context, options)
    transformPubsub(context, options)
}
