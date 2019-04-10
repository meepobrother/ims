import { Express } from 'express';
import { Type } from 'ims-decorator';
import Libp2p from 'libp2p';
export declare function parseRouter(addons: Type<any>[], app: Express, node: Libp2p): void;
