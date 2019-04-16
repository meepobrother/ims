import { observable, action } from 'mobx'
import util from 'ims-util'
export class ClusterHome {
    @observable
    list: any[] = [];

    @action
    getClusterList() {
        return util.http.get('/adminer/cluster/getClusterList').then(res => {
            this.list = res.data;
        })
    }
}

export default new ClusterHome();