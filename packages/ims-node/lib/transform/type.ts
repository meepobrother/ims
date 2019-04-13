import { Express } from 'express'
import Libp2p from 'libp2p'
import WebSocket from 'ws';
import { ConnectionManager } from 'typeorm'
export interface TransformOptions {
    libp2p: Libp2p,
    server: WebSocket.Server,
    app: Express,
    connectionManager: ConnectionManager
}