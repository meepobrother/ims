import React = require('react');
import { Add } from './store';
export default class Index extends React.Component<{
    add?: Add;
}, any> {
    render(): JSX.Element;
}
