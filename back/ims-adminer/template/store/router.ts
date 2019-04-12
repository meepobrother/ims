import { observable, action } from 'mobx'

export default class ImsAdminerRouter {
    @observable
    sum: number = 0;

    @action
    add() {
        this.sum += 1;
    }
}
