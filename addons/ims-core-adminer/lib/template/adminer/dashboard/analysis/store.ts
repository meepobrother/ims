import { observable, action } from 'mobx'
import util from 'ims-util'
export class Analysis {
    @observable
    info: any;

    @action
    analysis() {
        return util.http.get('/adminer/dashboard/updateAnalysis').then(res => {
            console.log(res)
            return res;
        });
    }
}

export default new Analysis();

