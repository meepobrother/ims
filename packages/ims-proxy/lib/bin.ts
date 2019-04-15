#!/usr/bin/env node
import { createProxyServer } from './server';
import express from 'express';
import { createServer, IncomingMessage } from 'http';
import WebSocket from 'ws';
import def from './proto';
import yargsParser from 'yargs-parser';
const args = yargsParser(process.argv.slice(2))
const app = express();
const handler = createProxyServer();
app.use(handler);
app.get('*', (req, res, next) => {
    res.end(`not found ${req.path}`)
})
const server = createServer(app)
const ws = new WebSocket.Server({
    server: server
});
ws.on('connection', (socket: WebSocket, request: IncomingMessage) => {
    let { headers: { host } } = request;
    const hostName = host.split(':')[0];
    socket.on('message', (data: string | Buffer) => {
        const str = data.toString('utf8');
        const hand = handler.hostMap.get(hostName);
        if (hand) {
            const buf = def.Socket.encode({ type: 'socket', data: str, key: handler.getKey() });
            hand.emit('socket', buf);
        }
    })
    socket.send(`welcome!`)
});
if (args._.length > 0) {
    const port: any = args._[0];
    server.listen(port, '0.0.0.0', () => console.log(`express start at ${port}`));
} else {
    server.listen(80, '0.0.0.0', () => console.log(`express start at 80`));
}