import { observable, action } from 'mobx';
import util from 'ims-util'
interface Footer {
    links: any[];
    copyright: string;
}
export default class Cookie {

    @observable
    logo: string;

    @observable
    left: any[] = [{
        title: '首页',
        href: '/home/index'
    }, {
        title: '安装',
        href: '/home/install'
    }, {
        title: '新闻',
        href: '/home/news'
    }, {
        title: '产品',
        href: '/home/products'
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
    footer: Footer = {
        links: [{
            title: '关于我们',
            href: '/home/aboutus'
        }, {
            title: '联系我们',
            href: '/home/concat'
        }],
        copyright: 'powser by 杭州米波网络科技有限公司'
    }

    @action
    load() {
        util.http.get('/')
    }
}