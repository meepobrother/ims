declare module 'stream-to-pull-stream' {
    interface IDuplex {
        sink: (read: any) => any;
        source: (abort: any, cb: any) => any;
    }
    export function duplex(socket: any): IDuplex;
}