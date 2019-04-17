interface ImsWsHandler<T = any> {
    (data: T): void;
}
export declare class ImsWs {
    ws: WebSocket;
    events: Map<string, ImsWsHandler>;
    handler: ImsWsHandler;
    constructor();
    on<T>(eventName: string, handler: (data: T) => any): void;
    remove(eventName: string): void;
    setDefaultHandler(handler: ImsWsHandler): void;
    send<T = any>(data: {
        type: string;
        payload: T;
    }): void;
    static create(): Promise<ImsWs>;
    onInit(): Promise<void>;
    onOpen(): Promise<{}>;
}
export {};
