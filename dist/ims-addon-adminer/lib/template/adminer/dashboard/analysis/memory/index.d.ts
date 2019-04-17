import React = require('react');
import "./index.less";
import { Analysis } from '../store';
export default class Index extends React.Component<{
    analysis?: Analysis;
}, any> {
    render(): JSX.Element;
    renderMemory(): JSX.Element;
    getV(): number;
    toDisplayMem(v: number): string;
}
