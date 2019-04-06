interface ImsWsHandler<T=any> {
    (data: T): void
}
export class ImsWs {
    ws: WebSocket;
    events: Map<string, ImsWsHandler> = new Map();
    handler: ImsWsHandler = (data) => console.log(data);
    constructor() { }

    on<T>(eventName: string, handler: (data: T) => any) {
        this.events.set(eventName, handler);
    }

    remove(eventName: string) {
        this.events.delete(eventName)
    }

    setDefaultHandler(handler: ImsWsHandler) {
        this.handler = handler;
    }

    send<T=any>(data: { type: string, payload: T }) {
        this.ws.send(JSON.stringify(data))
    }

    static async create() {
        const ws = new ImsWs();
        await ws.onInit();
        return ws;
    }

    async onInit() {
        this.ws = new WebSocket(`ws://${location.hostname}:${location.port}`);
        this.ws.onmessage = (data: any) => {
            const { type, payload } = data;
            if (this.events.has(type)) {
                this.events.get(type)(payload)
            }
        }
        this.ws.onopen = () => {
            console.log(`ws on open`)
            this.ws.send(`open`)
        }
        await this.onOpen();
    }

    onOpen() {
        return new Promise((resolve, reject) => {
            this.ws.onopen = () => {
                resolve()
            }
            this.ws.onerror = () => {
                reject();
            }
            this.ws.onclose = () => {
                reject();
            }
        });
    }
}