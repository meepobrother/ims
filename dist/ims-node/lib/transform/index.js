"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
exports.socketSet = new Set();
const application_1 = require("./application");
function transform(addons, options) {
    const { server } = options;
    const application = new application_1.ImsApplication(addons, options);
    // socket
    server.on('connection', (ws, req) => {
        // 建立连接
        exports.socketSet.add(ws);
        ws.on('open', () => {
            // open
        });
        // 接收消息
        ws.on('message', (data) => {
            // 收到消息
            const { type, payload } = JSON.parse(data.toString());
            socket_1.handlerMap.get(type)(ws, req, payload);
        });
        // 错误
        ws.on('error', (err) => {
            exports.socketSet.delete(ws);
        });
        // 关闭
        ws.on('close', (code, reason) => {
            ws.send({
                type: 'close',
                payload: {
                    code,
                    reason
                }
            }, (err) => {
                // error
            });
            exports.socketSet.delete(ws);
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
exports.transform = transform;
