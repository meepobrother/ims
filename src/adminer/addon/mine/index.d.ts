import React = require('react');
import { AddonMine } from './store';
export default class Index extends React.Component<{
    mine: AddonMine;
}, any> {
    componentDidMount(): void;
    render(): JSX.Element;
}
