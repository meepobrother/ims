import { observable, action } from 'mobx'
import util from 'ims-util';
interface AnalysisInfo {
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
    cpus: {
        model: string;
        speed: number;
        times: any;
    }[];
    arch: string;
}
export class Analysis {
    @observable
    info: AnalysisInfo;

    @observable
    tasks: any[] = [];

    analysis() {
        return util.http.get('/adminer/dashboard/updateAnalysis').then(res => {
            this.setInfo(res.data)
            return res;
        });
    }

    pm2List() {
        return util.http.get('/adminer/dashboard/pm2List').then(res => {
            this.tasks = res.data;
            return res;
        });
    }

    @action
    setInfo(info: AnalysisInfo) {
        this.info = info;
    }
}


export default new Analysis();

