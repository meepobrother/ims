import React = require('react');
import { Analysis } from './store';
import "./index.less";
export default class Index extends React.Component<{
    analysis?: Analysis;
    role: any;
}, any> {
    componentDidMount(): void;
    render(): JSX.Element;
    renderDetail(): JSX.Element;
    renderTasks(): JSX.Element[];
    renderExtra(): JSX.Element;
    renderTask(): JSX.Element;
}
