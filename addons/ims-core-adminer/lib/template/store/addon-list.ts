import { observable, action } from 'mobx';
export class AddonList {

    @observable
    list: any[] = [{
        title: '模块管理'
    }];

    @action
    setList(list: any[]) {
        this.list = list;
    }

    @action
    addList(item: any) {
        this.list.push(item)
    }
}

export default new AddonList();