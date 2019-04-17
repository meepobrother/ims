import { observer, inject } from 'mobx-react'
import React = require('react');
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { HomeLayout as ImsHomeLayout } from '../../../store/homeLayout'
@inject('homeLayout')
@observer
export default class Index extends React.Component<{ homeLayout?: ImsHomeLayout }, any> {
    render() {
        const { homeLayout } = this.props;
        return <GlobalFooter
            links={homeLayout.footer.links}
            copyright={homeLayout.footer.copyright}
        ></GlobalFooter>
    }
}
