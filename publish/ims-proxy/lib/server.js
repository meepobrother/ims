"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const proto_1 = __importDefault(require("./proto"));
const path_1 = require("path");
const root = process.cwd();
const fs_extra_1 = require("fs-extra");
function createProxyServer() {
    const hostMap = new Map();
    const keyMap = new Map();
    const server = net_1.createServer((socket) => {
        let datas = Buffer.alloc(0);
        socket.on('data', (data) => {
            datas = Buffer.concat([datas, data]);
            try {
                const message = proto_1.default.Message.decode(datas);
                datas = Buffer.alloc(0);
                const { type, key, payload } = message;
                const handler = keyMap.get(key);
                if (type === 'connect') {
                    hostMap.set(payload.host, socket);
                    fs_extra_1.rmdirSync(path_1.join(__dirname, 'assets', payload.host));
                }
                else {
                    if (handler) {
                        handler.type(payload.type);
                        const extra = ['.js', '.png', '.css', '.jpeg', '.json', '.svg', '.mp3'].find((ext) => payload.path.endsWith(ext));
                        const data = Buffer.from(payload.data);
                        keyMap.delete(key);
                        if (extra) {
                            const filePath = path_1.join(__dirname, 'assets', payload.host, payload.path);
                            fs_extra_1.ensureDirSync(path_1.dirname(filePath));
                            fs_extra_1.writeFileSync(filePath, data);
                            handler.sendFile(filePath);
                        }
                        else {
                            handler.end(data.toString());
                        }
                    }
                }
            }
            catch (e) { }
        });
    });
    server.listen(9000, '0.0.0.0', () => {
        console.log(`tcp/ip server start at 9000`);
    });
    const handler = (req, res, next) => {
        const { method, body, path, headers, hostname } = req;
        const key = getKey();
        if (path.endsWith('.map')) {
            res.end(``);
            return;
        }
        const extra = ['.js', '.png', '.css', '.jpeg', '.json', '.svg', '.mp3'].find((ext) => path.endsWith(ext));
        if (extra) {
            const filePath = path_1.join(__dirname, 'assets', hostname, path);
            if (fs_extra_1.existsSync(filePath)) {
                res.sendFile(filePath);
                return;
            }
            const sysPath = path_1.join(__dirname, 'assets', path);
            if (fs_extra_1.existsSync(sysPath)) {
                res.sendFile(sysPath);
                return;
            }
        }
        const duplex = hostMap.get(hostname);
        if (duplex) {
            keyMap.set(key, res);
            const buf = proto_1.default.Request.encode({
                key: key,
                method,
                body: JSON.stringify(body || {}),
                path,
                headers: JSON.stringify(headers || {}),
                hostname
            });
            duplex.write(buf);
        }
        else {
            next();
        }
    };
    handler.hostMap = hostMap;
    handler.keyMap = keyMap;
    handler.server = server;
    handler.getKey = getKey;
    return handler;
}
exports.createProxyServer = createProxyServer;
let i = 100;
function getKey() {
    return ++i;
}
