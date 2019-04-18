import jsonwebtoken from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
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
export function jwtMiddle(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        const key = getKey();
        jsonwebtoken.verify(token, key.privKey, (err: Error, decoded: any) => {
            req.user = decoded;
            next();
        });
    } catch (e) {
        next();
    }
}
export function verify(fn: <T>(user: T) => boolean) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (fn(req.user)) {
            next();
        } else {
            res.json({
                code: codes.PermissionDenied,
                message: '对不起,权限不足'
            });
        }
    }
}