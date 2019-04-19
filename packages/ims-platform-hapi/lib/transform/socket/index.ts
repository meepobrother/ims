import { TypeContext } from 'ims-decorator';
import { transformSocket } from './socket'
import WebSocket from 'ws';
export function transformWs(context: TypeContext, options: WebSocket.Server) {
    transformSocket(context, options)
}
export { handlerMap } from './socket';