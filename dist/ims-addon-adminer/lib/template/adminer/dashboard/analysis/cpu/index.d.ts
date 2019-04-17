import React = require('react');
import { Analysis } from '../store';
import "./index.less";
export default class Index extends React.Component<{
    analysis?: Analysis;
}, any> {
    render(): JSX.Element;
    renderCpu(): JSX.Element;
    getTotalV(): number;
}
