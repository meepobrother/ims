export * from 'jsonwebtoken';
import { verify as jwtVerify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getKey } from './key';
import * as codes from './codes'
export function verify(fn: <T>(user: T) => boolean) {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.get('token')
        const key = getKey();
        jwtVerify(token, key.pubKey, (err, decoded) => {
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