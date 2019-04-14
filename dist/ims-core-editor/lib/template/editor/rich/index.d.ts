import { Component } from 'react';
import "./index.less";
import ImsCoreEditor from '../../store/index';
export default class Index extends Component<{
    editor: ImsCoreEditor;
}, {
    focus: boolean;
}> {
    state: {
        focus: boolean;
    };
    onChange: (text: any, medium: any) => void;
    render(): JSX.Element;
}
