#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const ws_1 = __importDefault(require("ws"));
const proto_1 = __importDefault(require("./proto"));
const yargs_parser_1 = __importDefault(require("yargs-parser"));
const args = yargs_parser_1.default(process.argv.slice(2));
const app = express_1.default();
const handler = server_1.createProxyServer();
app.use(handler);
app.get('*', (req, res, next) => {
    res.end(`not found ${req.path}`);
});
const server = http_1.createServer(app);
const ws = new ws_1.default.Server({
    server: server
});
ws.on('connection', (socket, request) => {
    let { headers: { host } } = request;
    const hostName = host.split(':')[0];
    socket.on('message', (data) => {
        const str = data.toString('utf8');
        const hand = handler.hostMap.get(hostName);
        console.log(`on message`);
        if (hand) {
            const buf = proto_1.default.Socket.encode({ type: 'socket', data: str, key: handler.getKey() });
            hand.emit('socket', buf);
        }
    });
    socket.send(`welcome!`);
});
if (args._.length > 0) {
    const port = args._[0];
    server.listen(port, '0.0.0.0', () => console.log(`express start at ${port}`));
}
else {
    server.listen(80, '0.0.0.0', () => console.log(`express start at 80`));
}
