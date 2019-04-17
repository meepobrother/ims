export interface NginxHost {
    ip: string;
    port: number;
}
export interface NginxProps {
    upstream: NginxHost[];
    path: string;
    name: string;
}
export declare function createNginxConfig(props: NginxProps[]): string;
