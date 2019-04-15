import { observable, action } from 'mobx';
import util from 'ims-util'
export class AdminerLayout {

    @observable
    logo: string;

    @observable
    sider: {
        collapsed: boolean;
        onCollapse: (collapsed: boolean, type: 'clickTrigger' | 'responsive') => {}
    }

    @observable
    collapsed: boolean;

    @observable
    collapsedIcon: 'menu-unfold' | 'menu-fold' = 'menu-fold';

    constructor() {
        this.collapsed = !!util.store.get('adminer:collapsed');
        this.setCollapsedIcon();
    }

    @action
    setCollapsed(collapsed?: boolean) {
        if (typeof collapsed === 'boolean') {
            this.collapsed = !!collapsed;
        } else {
            collapsed = !this.collapsed;
            this.collapsed = collapsed;
        }
        this.setCollapsedIcon();
        util.store.set('adminer:collapsed', this.collapsed);
    }

    @action
    setCollapsedIcon(icon?: 'menu-unfold' | 'menu-fold') {
        if (icon) {
            this.collapsedIcon = icon;
        } else {
            if (this.collapsed) {
                this.collapsedIcon = 'menu-unfold'
            } else {
                this.collapsedIcon = 'menu-fold'
            }
        }
    }
}

export default new AdminerLayout();