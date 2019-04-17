import { observable, action } from 'mobx';
import util from 'ims-util'
import { history } from 'ims-adminer'
interface Footer {
    links: any[];
    copyright: string;
}
import login from './login'
export class HomeLayout {

    @observable
    logo: string;

    @observable
    left: any[] = [{
        title: '首页',
        href: '/home/index'
    }];

    @observable
    right: any[] = [{
        title: '登录',
        href: '/home/login'
    }, {
        title: '注册',
        href: '/home/register'
    }];

    @observable
    userMenus: any[] = [{
        title: '进入后台',
        onClick: () => {
            history.push('/adminer');
        }
    }, {
        title: '退出登录',
        onClick: () => {
            login.logout();
        }
    }]

    @observable
    footer: Footer = {
        links: [{
            title: '关于我们',
            href: '/home/aboutus'
        }, {
            title: '联系我们',
            href: '/home/concat'
        }],
        copyright: 'Powser By 杭州米波网络科技有限公司'
    }

    @action
    load() {
        util.http.get('/')
    }
}
export default new HomeLayout();