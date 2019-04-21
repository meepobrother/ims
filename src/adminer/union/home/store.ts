import { observable, action } from 'mobx';
import util from 'ims-util';
export class Union {

    @observable
    list: any[] = [];

    @action
    getUnionList() {
        return util.http.get('/adminer/union/getUnionList').then(res => {
            this.list = res.data;
            console.log(this.list)
        })
    }
}

export default new Union()