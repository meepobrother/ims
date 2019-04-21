import "reflect-metadata";
import { Server } from 'hapi';
import { IConfig } from 'ims-common';
import { ConnectionManager } from 'typeorm';
export interface ImsPlatformHapiOptions {
    port?: number;
    host?: string;
    addons?: string[];
}
import WebSocket from 'ws';
import Libp2p from 'libp2p';
import { TypeContext } from 'ims-decorator';
export declare class ImsPlatformHapi {
    options: ImsPlatformHapiOptions;
    server: Server;
    ws: WebSocket.Server;
    libp2p: Libp2p;
    connectionManager: ConnectionManager;
    installed: boolean;
    config: IConfig;
    constructor(options?: ImsPlatformHapiOptions);
    addAddon(name: string): void;
    init(test?: boolean): Promise<void>;
    buildMobile(context: TypeContext): void;
    /** 静态资源 模板 */
    registerStatic(): void;
    /** 开发者模式监听 */
    watch(context: TypeContext): void;
    /** 注册websocket */
    registerSocket(): void;
}
