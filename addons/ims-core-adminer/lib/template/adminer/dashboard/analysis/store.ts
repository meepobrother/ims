import { observable, action } from 'mobx'
import util from 'ims-util';
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
        versions: typeof process.versions,
        npm: string;
        cwd: string;
    }
}
export class Analysis {
    @observable
    info: AnalysisInfo;

    @observable
    loading: boolean;

    @action
    analysis() {
        this.loading = true;
        return util.http.get('/adminer/dashboard/updateAnalysis').then(res => {
            this.info = res.data;
            this.loading = false;
        });
    }
}


export default new Analysis();

