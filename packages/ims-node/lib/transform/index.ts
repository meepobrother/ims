import { Type } from "ims-decorator";
import { visitor } from 'ims-common'
import transformAddon from './addon'
import WebSocket from 'ws';
import { handlerMap } from './socket'
import { TransformOptions } from './type'
const log = (str: string) => console.log(`transform:${str}`)
export const socketSet: Set<WebSocket> = new Set();
export function transform(
    addons: Type<any>[],
    options: TransformOptions
) {
    const { server } = options;
    addons.map(addon => {
        const addonType = visitor.visitType(addon)
        transformAddon(addonType, options);
    });
    // socket
    server.on('connection', (ws, req) => {
        // 建立连接
        socketSet.add(ws);
        // 接收消息
        ws.on('message', (data) => {
            // 收到消息
            log(`receive socket message:${data}`)
            const { type, payload } = JSON.parse(data.toString());
            handlerMap.get(type)(ws, req, payload);
        });
        // 错误
        ws.on('error', (err) => {
            log(err.message)
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
                if (err) log(err.message)
            });
            socketSet.delete(ws)
        });
    });
    server.on('error', (err) => log(err.message));
    server.on('listening', () => { });
    // todo
    server.on('headers', (headers, req) => {
        // 检查
        log(headers.join('\n'))
    });
}