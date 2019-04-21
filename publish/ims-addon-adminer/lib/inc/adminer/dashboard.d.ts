/// <reference types="node" />
import os from 'os';
export declare class ImsCoreAdminerDashboard {
    updateAnalysis(): Promise<{
        hostname: string;
        uptime: number;
        freemem: number;
        totalmem: number;
        cpus: os.CpuInfo[];
        type: string;
        release: string;
        networkInterfaces: {
            [index: string]: os.NetworkInterfaceInfo[];
        };
        homedir: string;
        platform: NodeJS.Platform;
        tmpdir: string;
        arch: string;
        avg: number[];
        processes: {};
        pm2: {};
        node: {
            path: string;
            cwd: string;
            versions: NodeJS.ProcessVersions;
            npm: {};
        };
    }>;
    getProcesses(): Promise<{}>;
    /** 重新启动 */
    restart(): void;
    killPid(body: any): void;
    pm2List(): Promise<{}>;
}
