import WebSocket = require('ws');
import { TypeContext } from 'ims-decorator';
export declare function parseWebSocket(context: TypeContext, socket: WebSocket, server: WebSocket.Server): void;
