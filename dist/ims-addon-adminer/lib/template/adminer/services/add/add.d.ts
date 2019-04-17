import React = require('react');
import { Add } from './store';
import "./add.less";
export default class Index extends React.Component<{
    add?: Add;
}, any> {
    render(): JSX.Element;
}
