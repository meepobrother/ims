/// <reference types="node" />
import WebSocket from 'ws';
import { TypeContext } from 'ims-decorator';
import http from 'http';
interface Handler<T> {
    (ws: WebSocket, req: http.IncomingMessage, payload: T): any;
}
export declare const handlerMap: Map<string, Handler<any>>;
import { TransformOptions } from '../type';
export declare function transformSocket(context: TypeContext, options: TransformOptions): void;
export {};
