import { observable, action } from 'mobx';
export class AddonList {

    @observable
    list: any[] = [{
        title: '添加',
        icon: 'plus'
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