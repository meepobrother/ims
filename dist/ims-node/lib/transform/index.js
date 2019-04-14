"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
const log = (str) => console.log(`transform:${str}`);
exports.socketSet = new Set();
const application_1 = require("./application");
function transform(addons, options) {
    console.log(`create application`);
    const { server } = options;
    const application = new application_1.ImsApplication(addons, options);
    // socket
    server.on('connection', (ws, req) => {
        log(`connection`);
        // 建立连接
        exports.socketSet.add(ws);
        ws.on('open', () => {
            log(`ws open`);
        });
        // 接收消息
        ws.on('message', (data) => {
            // 收到消息
            log(`receive socket message:${data}`);
            const { type, payload } = JSON.parse(data.toString());
            socket_1.handlerMap.get(type)(ws, req, payload);
        });
        // 错误
        ws.on('error', (err) => {
            log(`error:${err.message}`);
            exports.socketSet.delete(ws);
        });
        // 关闭
        ws.on('close', (code, reason) => {
            log(`close:${code}${reason}`);
            ws.send({
                type: 'close',
                payload: {
                    code,
                    reason
                }
            }, (err) => {
                if (err)
                    log(err.message);
            });
            exports.socketSet.delete(ws);
        });
    });
    server.on('error', (err) => log(`error:${err.message}`));
    server.on('listening', () => {
        console.log(`listening`);
    });
    // todo
    server.on('headers', (headers, req) => {
        // 检查
        log(`headers:${headers.join(',')}`);
    });
    return application;
}
exports.transform = transform;
