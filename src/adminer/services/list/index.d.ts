import React = require('react');
import './index.less';
import { ClusterHome } from './store';
export default class Index extends React.Component<{
    home?: ClusterHome;
}, any> {
    componentDidMount(): void;
    render(): JSX.Element;
}
