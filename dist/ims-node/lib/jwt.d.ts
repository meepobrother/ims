/// <reference types="node" />
import { Request, Response, NextFunction } from 'express';
export declare function sign(payload: string | Buffer | object): string;
export declare function verify(fn: <T>(user: T) => boolean): (req: Request, res: Response, next: NextFunction) => void;
