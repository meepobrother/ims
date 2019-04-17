import { observable, action } from 'mobx';
import util from 'ims-util';
import { history } from 'ims-adminer';
import React = require('react');
import add from '../add/store'
interface HomeItem { }
export class ClusterHome {
    @observable
    list: HomeItem[] = [];

    @observable
    count: number;

    @observable
    columns: any[] = [{
        key: 'name',
        title: '名称',
        dataIndex: 'name'
    }, {
        key: 'path',
        title: '路径',
        dataIndex: 'path'
    }, {
        key: 'upstream',
        title: '主机',
        dataIndex: 'upstream',
        render: (item: any) => {
            return <div>
                {item.map((li, key) => {
                    return <div key={key}>{li.ip}:{li.port}</div>
                })}
            </div>
        }
    }, {
        render: (item) => {
            return <div>
                <a onClick={() => this.edit(item)}>编辑</a>&nbsp;<a onClick={() => this.remove(item)}>移除</a>
            </div>
        }
    }];

    @action
    edit(item) {
        add.setName(item.name);
        add.setPath(item.path);
        add.setUpstream(item.upstream);
        this.activeTab = 'add';
    }

    @action
    remove(item) {

    }

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

    @observable
    activeTab: string = 'list';

    @action
    setActiveTab(e: string) {
        this.activeTab = e;
        if (this.activeTab === 'add') {
            add.clear();
        }
    }

}

export default new ClusterHome();