import { Page, Store, CorePage } from 'ims-core'
import "./index.scss";
import { ImsIndexStore } from './store';
@Page()
export class ImsIndexMobilePage implements CorePage {

    @Store()
    store: ImsIndexStore

    onReachBottom() {
        this.store.loadMore();
    }
}
