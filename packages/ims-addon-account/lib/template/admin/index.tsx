import { Page, Store, CorePage } from 'ims-core'
import "./index.admin.scss";
import { ImsIndexStore } from './store';
@Page()
export class ImsIndexAdminPage implements CorePage {

    @Store()
    store: ImsIndexStore

    onReachBottom() {
        this.store.loadMore();
    }
}
