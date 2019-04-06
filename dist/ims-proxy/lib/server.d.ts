/// <reference types="node" />
import { Request, Response, NextFunction } from 'express';
import { Socket, Server } from 'net';
export declare function createProxyServer(): {
    (req: Request, res: Response, next: NextFunction): void;
    hostMap: Map<string, Socket>;
    keyMap: Map<Number, Response>;
    server: Server;
    getKey: () => number;
};
