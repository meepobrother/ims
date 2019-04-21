import React = require('react');
import "./index.less";
import { AddonList } from '../../store/addon-list';
export default class Index extends React.Component<{
    addonList: AddonList;
}, any> {
    componentDidMount(): void;
    render(): JSX.Element;
}
