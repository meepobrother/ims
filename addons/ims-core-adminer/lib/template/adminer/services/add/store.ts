import { observable, action } from 'mobx';
import util from 'ims-util';
import { history } from 'ims-adminer'
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
    setUpstream(upstream: any) {
        this.upstream = upstream;
    }

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
        util.http.post('/adminer/services/addServer', data).then(res => {
            const { data } = res;
            if (data.code === 0) {
                history.push('/adminer/services')
            } else { 

            }
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

    @action
    removeHost(index: number) {
        const upstream = this.upstream;
        upstream.splice(index, 1);
        this.upstream = upstream;
    }

    @action
    clear() {
        this.setName('')
        this.setPath('')
        this.upstream = [];
    }
}

export default new Add();
