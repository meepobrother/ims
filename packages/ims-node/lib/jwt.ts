import jsonwebtoken from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getKey } from './key';
import * as codes from './codes';

export function sign(payload: string | Buffer | object): string {
    const key = getKey();
    return jsonwebtoken.sign(payload, key.privKey, {
        expiresIn: '30m'
    });
}
export function verify(fn: <T>(user: T) => boolean) {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.get('token')
        const key = getKey();
        jsonwebtoken.verify(token, key.pubKey, (err, decoded) => {
            if (err) {
                res.json({
                    data: {},
                    code: codes.TokenDecodeError,
                    message: err.message
                })
            } else {
                if (fn(decoded)) {
                    next();
                } else {
                    res.json({
                        data: {},
                        code: codes.PermissionDenied,
                        message: '对不起,权限不足'
                    })
                }
            }
        })
    }
}