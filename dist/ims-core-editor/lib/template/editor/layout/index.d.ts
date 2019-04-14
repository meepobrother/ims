import { Component } from 'react';
import "./index.less";
import ImsEditor from '../../store/index';
export default class Index extends Component<{
    editor?: ImsEditor;
    type: 'markdown' | 'rich';
}> {
    switchEditor(): JSX.Element;
    render(): JSX.Element;
}
