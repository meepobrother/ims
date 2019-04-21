export declare class Add {
    name: string;
    path: string;
    ip: string;
    upstream: {
        ip: string;
        port: number;
    }[];
    setUpstream(upstream: any): void;
    setIp(ip: string): void;
    port: number;
    setPort(port: any): void;
    modelVisible: boolean;
    setName(name: string): void;
    setPath(path: string): void;
    switchModel(): void;
    addServer(): void;
    addHost(): void;
    removeHost(index: number): void;
    clear(): void;
}
declare const _default: Add;
export default _default;
