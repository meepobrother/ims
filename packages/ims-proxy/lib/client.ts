import fetch from 'node-fetch';
import { createConnection } from 'net';
import def from './proto';
export function createClient(host: string, port: number, www?: string) {
    const client = createConnection(9000, host, () => {
        const buf = def.Message.encode({
            type: 'connect',
            key: 10,
            payload: {
                type: 'string',
                data: Buffer.from(host, 'utf8'),
                path: '/',
                host: www || host
            }
        });
        send(buf)
    });
    function send(buf: Buffer) {
        client.write(buf)
    }
    client.on('socket', (data: Buffer) => {
        const item = def.Socket.decode(data, 0, data.length);
    })
    let datas: Buffer = Buffer.alloc(0);
    client.on('data', (data: Buffer) => {
        datas = Buffer.concat([datas, data]);
        try {
            const item = def.Request.decode(datas, 0, data.length)
            datas = Buffer.alloc(0);
            const { path, headers, method, body, key } = item;
            const options: any = {
                headers: JSON.parse(headers),
                method: method
            };
            if (method === 'POST') {
                options.body = body;
            }
            fetch(`http://localhost:${port}${path}`, options).then(async res => {
                const dataBuf = await res.buffer();
                const type = res.headers.get('content-type');
                const buf = def.Message.encode({
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
                const buf = def.Message.encode({
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
                })
                send(buf);
            });
        } catch (e) {

        }

    });
}
