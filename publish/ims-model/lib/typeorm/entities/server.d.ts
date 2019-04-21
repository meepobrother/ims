export interface NginxHost {
    ip: string;
    port: number;
}
export declare class ImsServer {
    name: string;
    path: string;
    upstream: NginxHost[];
}
