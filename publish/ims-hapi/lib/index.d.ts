import { Server, ServerOptions } from 'hapi';
declare const Segment: any;
export declare class ImsSegment extends Segment {
    add(segments: any, record: any): void;
}
export interface Options extends ServerOptions {
    dev?: boolean;
}
export default function (options: ServerOptions): Server;
export {};
