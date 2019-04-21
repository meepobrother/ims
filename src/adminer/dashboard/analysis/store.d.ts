/// <reference types="node" />
import { CpuInfo } from 'os';
export interface AnalysisInfo {
    uptime: number;
    type: string;
    freemem: number;
    totalmem: number;
    tmpdir: string;
    release: string;
    platform: string;
    networkInterfaces: {
        [key: string]: any;
    };
    hostname: string;
    homedir: string;
    cpus: CpuInfo[];
    arch: string;
    processes: any[];
    pm2: any[];
    node: {
        path: string;
        versions: typeof process.versions;
        npm: string;
        cwd: string;
    };
}
export declare class Analysis {
    info: AnalysisInfo;
    loading: boolean;
    analysis(): Promise<void>;
}
declare const _default: Analysis;
export default _default;
