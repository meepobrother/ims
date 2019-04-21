import { NginxProps } from './createNginxConfig';
export declare class Nginx {
    createNginxConfig(props: NginxProps[]): string;
    /** 监听文件变化 */
    nginxWatch(): void;
    bootstrap(): Promise<void>;
}
export declare const nginx: Nginx;
