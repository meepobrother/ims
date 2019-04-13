import { TypeContext } from 'ims-decorator';
import { transformSocket } from './socket'
import { TransformOptions } from '../type'
export default function transform(context: TypeContext, options: TransformOptions) {
    transformSocket(context, options)
}
export { handlerMap } from './socket'