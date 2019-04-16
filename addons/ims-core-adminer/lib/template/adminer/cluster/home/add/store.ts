import { observable, action } from 'mobx';
import util from 'ims-util';
export class Add {

    @observable
    name: string;

    @observable
    path: string;

    @observable
    ip: string;

    @observable
    upstream: { ip: string, port: number }[] = [];

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

    @observable
    modelVisible: boolean;

    @action
    setName(name: string) {
        this.name = name;
    }

    @action
    setPath(path: string) {
        this.path = path;
    }

    @action
    switchModel() {
        this.modelVisible = !this.modelVisible;
    }

    @action
    addServer() {
        let data = {
            name: this.name,
            path: this.path,
            upstream: this.upstream
        }
        util.http.post('/adminer/server/addServer',data).then(res => {
            console.log(res.data)
        });
    }

    @action
    addHost() {
        console.log(this)
        this.switchModel();
        this.upstream.push({
            ip: this.ip,
            port: this.port
        });
        this.ip = '';
        this.port = undefined;
    }

    @action.bound
    removeHost(index: number) {
        const upstream = this.upstream;
        upstream.splice(index, 1);
        this.upstream = upstream;
    }
}

export default new Add();
