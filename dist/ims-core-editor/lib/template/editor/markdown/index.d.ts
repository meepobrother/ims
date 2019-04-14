import { Component } from "react";
import { IRouter } from 'ims-core';
import "brace/mode/markdown";
import "brace/theme/github";
import './index.less';
import ImsCoreEditor from '../../store/index';
import { Subject } from 'rxjs';
interface IndexProps {
    route: IRouter;
    editor: ImsCoreEditor;
}
export default class Index extends Component<IndexProps, any> {
    preview: HTMLDivElement;
    $change: Subject<string>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
