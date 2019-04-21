import { Store, Controller, Action } from 'ims-core';

@Store()
export class ImsIndexStore {
    @Action()
    loadMore() { }
}