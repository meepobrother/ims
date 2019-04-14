import React, { Component } from "react";
interface PreviewProps {
    editor?: ImsCoreEditor;
}
import "./index.less";
import { inject, observer } from 'mobx-react'
import ImsCoreEditor from "../../../store/index";
@inject('editor')
@observer
export class Preview extends Component<PreviewProps> {
    render() {
        return <div className="content-html" dangerouslySetInnerHTML={{ __html: this.props.editor.content }}></div >
    }
}