import { observable, action } from 'mobx';
import util from 'ims-util';
import { history } from 'ims-adminer';

interface HomeItem { }
export class ClusterHome {
    @observable
    list: HomeItem[] = [];

    @observable
    drawerVisible: boolean;

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
    addCluster() {
        history.push('/adminer/services/add')
    }
    
}

export default new ClusterHome();