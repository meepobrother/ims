import { observable, action } from 'mobx';
import util from 'ims-util'
import { history } from 'ims-adminer'
import login from './login'
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

    @observable
    copyright: string = 'Powser By 杭州米波网络科技有限公司';

    @observable
    menus: any[] = [{
        title: '官网首页',
        onClick: () => {
            history.push('/home/index')
        }
    }, {
        title: '系统监控',
        onClick: () => {
            history.push('/adminer/dashboard/analysis')
        }
    }, {
        title: '设计模块',
        onClick: () => {
            history.push('/adminer/addon/design')
        }
    }, {
        title: '我的模块',
        onClick: () => {
            history.push('/adminer/addon/mine')
        }
    }, {
        title: '退出登录',
        onClick: () => {
            return login.logout();
        }
    }];

    @observable
    lefts: any[] = [{
        title: '模块管理',
        onClick: () => {
            history.push('/adminer/manager/home')
        }
    }, {
        title: '服务管理',
        onClick: () => {
            history.push('/adminer/services/list')
        }
    }, {
        title: 'IMS联盟',
        onClick: () => {
            history.push('/adminer/union/home')
        }
    }, {
        title: '模块市场',
        onClick: () => {
            history.push('/adminer/shop/home')
        }
    }];

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