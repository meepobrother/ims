import { observable, action } from 'mobx';
import util from 'ims-util';
import { history } from 'ims-adminer';
import { link } from 'fs';

interface HomeItem { }
export class ClusterHome {
    @observable
    list: HomeItem[] = [];

    @observable
    count: number;

    @observable
    columns: any[] = [{
        key: 'name',
        title: 'name',
        dataIndex: 'name'
    }, {
        key: 'path',
        title: 'path',
        dataIndex: 'path'
    }, {
        key: 'upstream',
        title: 'upstream',
        dataIndex: 'upstream',
        render: (item: any) => {
            return <ul>
                {item.map((li, key) => {
                    return <li key={key}>{li.ip}:{li.port}</li>
                })}
            </ul>
        }
    }];

    @action
    getList() {
        return util.http.get('/adminer/services/getList').then(res => {
            this.list = res.data[0];
            this.count = res.data[1];
        });
    }

    @action
    addCluster() {
        history.push('/adminer/services/add')
    }

}

export default new ClusterHome();