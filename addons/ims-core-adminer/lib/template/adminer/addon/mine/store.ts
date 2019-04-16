import { observable, action } from 'mobx';
import util from 'ims-util'
import numeral from 'numeral'
import moment = require('moment');

console.log(moment);

export class AddonMine {

    @observable
    list: any[] = [];

    @observable
    count: number;

    @observable
    columns: any[] = [{
        title: '代号',
        key: 'name',
        dataIndex: 'name'
    }, {
        title: '名称',
        key: 'title',
        dataIndex: 'title'
    }, {
        title: '版本号',
        key: 'version',
        dataIndex: 'version'
    }, {
        title: '作者',
        key: 'author',
        dataIndex: 'author'
    }, {
        title: '创建时间',
        key: 'create_at',
        dataIndex: 'create_at',
        render: (item) => {
            console.log(item)
            return moment(item).format('YYYY-MM-DD')
        }
    }];

    @action
    getMineAddons() {
        util.http.get('/adminer/addon/mineAddons').then(res => {
            const { data } = res;
            this.list = data[0];
            this.count = data[1];
        });
    }
}
export default new AddonMine();