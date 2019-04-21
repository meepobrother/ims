import React = require('react');
import { HomeLayout as ImsHomeLayout } from '../../../store/homeLayout';
export default class Index extends React.Component<{
    homeLayout?: ImsHomeLayout;
}, any> {
    render(): JSX.Element;
}
