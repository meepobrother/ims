import { observable, action } from 'mobx';
import util from 'ims-util';
import { ImsServer } from 'ims-model';

interface HomeItem { }
export class ClusterHome {
    @observable
    list: HomeItem[] = [];

    @observable
    drawerVisible: boolean;

    @observable
    modelVisible: boolean;

    @action
    switchModel() {
        this.modelVisible = !this.modelVisible;
    }

    @observable
    currentServer: ImsServer = new ImsServer();

    @action
    setCurrentServerName(name: string) {
        this.currentServer.name = name;
    }

    @action
    setCurrentServerPath(path: string) {
        this.currentServer.path = path;
    }

    @observable
    ip: string;

    @action
    setIp(ip: string) {
        this.ip = ip;
    }

    @observable
    port: number;

    @action
    setPort(port: any) {
        this.port = port;
    }

    @action
    addHost() {
        this.currentServer.upstream.push({
            ip: this.ip,
            port: this.port
        })
    }

    @action
    switchDrawer() {
        this.drawerVisible = !this.drawerVisible;
    }

    @action
    getClusterList() {
        return util.http.get('/adminer/cluster/getClusterList').then(res => {
            this.list = res.data;
        })
    }

    @action
    addServer() {
        console.log(this)
    }
}

export default new ClusterHome();