import { observable, action } from 'mobx';

export class ImsRole { 

    /** token */
    @observable
    token: string;

    /** role */
    @observable
    role: string;

}