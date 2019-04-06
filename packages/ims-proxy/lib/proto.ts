import { protons } from 'ims-protons'
const protoDef = `
message MessagePayload {
    required string type = 1;
    repeated int32 data = 2;
    required string path = 3;
    required string host = 4;
}
message Message {
    required string type = 1;
    required int32 key = 2;
    required MessagePayload payload = 3;
}
message Request{
    required string method = 1;
    required int32 key = 2;
    required string body = 3;
    required string path = 4;
    required string headers = 5;
    required string hostname = 6;
}
message Socket{
    required string data = 1;
    required int32 key = 2;
    required string type = 3;
}
`;
interface IServerMessage {
    Message: {
        type: 'connect' | 'response';
        key: number;
        payload: {
            type: 'json' | 'html' | string;
            data: Buffer;
            path: string;
            host: string;
        };
    }
    Request: {
        key: number;
        method: string;
        body: string;
        path: string;
        headers: string;
        hostname: string;
    }
    Socket: {
        data: string;
        key: number;
        type: string;
    }
}
const configure = protons<IServerMessage>(protoDef);
export default configure;