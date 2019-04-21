import jsonwebtoken from 'jsonwebtoken'
import { Request, ResponseToolkit } from 'hapi'
import { getKey } from './key';
import * as codes from './codes';
declare global {
    namespace Express {
        interface Request {
            user: {
                id: number;
                username: string;
                role: string;
            };
        }
        interface Response { }
        interface Application { }
    }
}
export function sign(payload: string | Buffer | object): string {
    const key = getKey();
    return jsonwebtoken.sign(payload, key.privKey, {
        expiresIn: '30m'
    });
}
export function jwtMiddle(req: Request) {
    try {
        const token = req.headers.authorization;
        const key = getKey();
        jsonwebtoken.verify(token, key.privKey, (err: Error, decoded: any) => {
            req.auth.artifacts = decoded;
        });
    } catch (e) {
        console.log(e.message)
    }
}
export function verify(fn: <T>(user: T) => boolean) {
    return (req: Request, res: ResponseToolkit) => {
        const user = req.auth.credentials;
        if (fn(user)) {

        }
    }
}