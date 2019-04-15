import { Type } from "ims-decorator";
import WebSocket from 'ws';
import { handlerMap } from './socket'
import { TransformOptions } from './type'
export const socketSet: Set<WebSocket> = new Set();
import { ImsApplication } from './application'
export function transform(
    addons: Type<any>[],
    options: TransformOptions
): ImsApplication {
    const { server } = options;
    const application = new ImsApplication(addons, options);
    // socket
    server.on('connection', (ws, req) => {
        // 建立连接
        socketSet.add(ws);
        ws.on('open', () => {
            // open
        })
        // 接收消息
        ws.on('message', (data) => {
            // 收到消息
            const { type, payload } = JSON.parse(data.toString());
            handlerMap.get(type)(ws, req, payload);
        });
        // 错误
        ws.on('error', (err) => {
            socketSet.delete(ws);
        });
        // 关闭
        ws.on('close', (code: number, reason: string) => {
            ws.send({
                type: 'close',
                payload: {
                    code,
                    reason
                }
            }, (err) => {
                // error
            });
            socketSet.delete(ws)
        });
    });
    server.on('error', (err) => {
        // error
    });
    server.on('listening', () => {
        // listening
    });
    // todo
    server.on('headers', (headers, req) => {
        // 检查
    });
    return application;
}
export * from './type'