"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const net_1 = require("net");
const proto_1 = tslib_1.__importDefault(require("./proto"));
function createClient(host, port, www) {
    const client = net_1.createConnection(9000, host, () => {
        console.log(`create connection success`);
        const buf = proto_1.default.Message.encode({
            type: 'connect',
            key: 10,
            payload: {
                type: 'string',
                data: Buffer.from(host, 'utf8'),
                path: '/',
                host: www || host
            }
        });
        send(buf);
    });
    function send(buf) {
        client.write(buf);
    }
    client.on('socket', (data) => {
        const item = proto_1.default.Socket.decode(data, 0, data.length);
        console.log(item);
    });
    let datas = Buffer.alloc(0);
    client.on('data', (data) => {
        datas = Buffer.concat([datas, data]);
        try {
            const item = proto_1.default.Request.decode(datas, 0, data.length);
            datas = Buffer.alloc(0);
            const { path, headers, method, body, key } = item;
            const options = {
                headers: JSON.parse(headers),
                method: method
            };
            if (method === 'POST') {
                options.body = body;
            }
            console.log(`http://localhost:${port}${path}`);
            node_fetch_1.default(`http://localhost:${port}${path}`, options).then(async (res) => {
                const dataBuf = await res.buffer();
                const type = res.headers.get('content-type');
                const buf = proto_1.default.Message.encode({
                    type: 'response',
                    key: key,
                    payload: {
                        type: type,
                        path: path,
                        data: dataBuf,
                        host: www || host
                    }
                });
                send(buf);
            }).catch(e => {
                const buf = proto_1.default.Message.encode({
                    type: 'response',
                    key: key,
                    payload: {
                        type: 'json',
                        path: path,
                        data: Buffer.from(JSON.stringify({
                            name: e.name,
                            code: e.code,
                            message: e.message
                        })),
                        host: www || host
                    }
                });
                send(buf);
            });
        }
        catch (e) {
        }
    });
}
exports.createClient = createClient;
