import { Request, Response, NextFunction } from 'express';
import { createServer, Socket, Server } from 'net';
import def from './proto';
import { join, dirname } from 'path';
const root = process.cwd();
import { rmdirSync, writeFileSync, ensureDirSync, existsSync } from 'fs-extra';
export function createProxyServer(): {
    (req: Request, res: Response, next: NextFunction): void;
    hostMap: Map<string, Socket>;
    keyMap: Map<Number, Response>;
    server: Server;
    getKey: () => number
} {
    const hostMap: Map<string, Socket> = new Map();
    const keyMap: Map<Number, Response> = new Map();
    const server = createServer((socket: Socket) => {
        let datas: Buffer = Buffer.alloc(0);
        socket.on('data', (data: Buffer) => {
            datas = Buffer.concat([datas, data]);
            try {
                const message = def.Message.decode(datas);
                datas = Buffer.alloc(0);
                const { type, key, payload } = message;
                const handler = keyMap.get(key);
                if (type === 'connect') {
                    hostMap.set(payload.host, socket);
                    rmdirSync(join(__dirname, 'assets', payload.host))
                } else {
                    if (handler) {
                        handler.type(payload.type);
                        const extra = ['.js', '.png', '.css', '.jpeg', '.json', '.svg', '.mp3'].find((ext) => payload.path.endsWith(ext))
                        const data = Buffer.from(payload.data);
                        keyMap.delete(key);
                        if (extra) {
                            const filePath = join(__dirname, 'assets', payload.host, payload.path);
                            ensureDirSync(dirname(filePath));
                            writeFileSync(filePath, data);
                            handler.sendFile(filePath);
                        } else {
                            handler.end(data.toString());
                        }
                    }
                }
            } catch (e) { }
        });
    });
    server.listen(9000, '0.0.0.0', () => {
        console.log(`tcp/ip server start at 9000`)
    });
    const handler = (req: Request, res: Response, next: NextFunction) => {
        const { method, body, path, headers, hostname } = req;
        const key = getKey();
        if (path.endsWith('.map')) {
            res.end(``)
            return;
        }
        const extra = ['.js', '.png', '.css', '.jpeg', '.json', '.svg', '.mp3'].find((ext) => path.endsWith(ext));
        if (extra) {
            const filePath = join(__dirname, 'assets', hostname, path);
            if (existsSync(filePath)) {
                res.sendFile(filePath);
                return;
            }
            const sysPath = join(__dirname, 'assets', path);
            if (existsSync(sysPath)) {
                res.sendFile(sysPath);
                return;
            }
        }
        const duplex = hostMap.get(hostname);
        if (duplex) {
            keyMap.set(key, res);
            const buf = def.Request.encode({
                key: key,
                method,
                body: JSON.stringify(body || {}),
                path,
                headers: JSON.stringify(headers || {}),
                hostname
            });
            duplex.write(buf);
        } else {
            next();
        }
    }
    handler.hostMap = hostMap;
    handler.keyMap = keyMap;
    handler.server = server;
    handler.getKey = getKey;
    return handler;
}
let i = 100;
function getKey() {
    return ++i;
}
