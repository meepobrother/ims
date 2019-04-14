"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsWs {
    constructor() {
        this.events = new Map();
        this.handler = (data) => console.log(data);
    }
    on(eventName, handler) {
        this.events.set(eventName, handler);
    }
    remove(eventName) {
        this.events.delete(eventName);
    }
    setDefaultHandler(handler) {
        this.handler = handler;
    }
    send(data) {
        this.ws.send(JSON.stringify(data));
    }
    static async create() {
        const ws = new ImsWs();
        await ws.onInit();
        return ws;
    }
    async onInit() {
        this.ws = new WebSocket(`ws://${location.hostname}:${location.port}`);
        this.ws.onmessage = (data) => {
            const { type, payload } = data;
            if (this.events.has(type)) {
                this.events.get(type)(payload);
            }
        };
        this.ws.onopen = () => {
            console.log(`ws on open`);
            this.ws.send(`open`);
        };
        await this.onOpen();
    }
    onOpen() {
        return new Promise((resolve, reject) => {
            this.ws.onopen = () => {
                resolve();
            };
            this.ws.onerror = () => {
                reject();
            };
            this.ws.onclose = () => {
                reject();
            };
        });
    }
}
exports.ImsWs = ImsWs;
