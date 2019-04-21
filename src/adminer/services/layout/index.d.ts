import React = require('react');
import './index.less';
import { ClusterHome } from '../list/store';
export default class Index extends React.Component<{
    home?: ClusterHome;
    route?: any;
}, any> {
    componentDidMount(): void;
    render(): JSX.Element;
}
