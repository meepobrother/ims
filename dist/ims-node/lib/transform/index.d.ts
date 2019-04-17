import { Type } from "ims-decorator";
import WebSocket from 'ws';
import { TransformOptions } from './type';
export declare const socketSet: Set<WebSocket>;
import { ImsApplication } from './application';
export declare function transform(addons: Type<any>[], options: TransformOptions): ImsApplication;
export * from './type';
