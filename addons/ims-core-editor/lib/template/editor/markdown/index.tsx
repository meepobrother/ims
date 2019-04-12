import React, { Component } from "react";
import { Button, Icon } from 'antd';
import { IRouter } from 'ims-adminer'
import AceEditor from "react-ace";
import Layout from '../layout'
import marked from 'marked';
import "brace/mode/markdown";
import "brace/theme/github";
import { Preview } from './preview/index'
import './index.less';
import ImsCoreEditor from '../../store/index'
import { observer, inject } from 'mobx-react';
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

interface IndexProps {
    route: IRouter;
    editor: ImsCoreEditor;
}
@inject('editor')
@observer
export default class Index extends Component<IndexProps, any> {
    preview: HTMLDivElement
    $change: Subject<string> = new Subject();
    componentDidMount() {
        this.$change.pipe(
            debounceTime(300)
        ).subscribe(res => {
            this.props.editor.setContent(marked(res))
        });
    }
    componentWillUnmount() {
        this.props.editor.setContent(``)
    }
    render() {
        const width = '50vw'
        return <Layout type="markdown">
            <div className="ims-core-ditor-markdown">
                <div className="editor">
                    <div className="editor-content">
                        <AceEditor
                            height={"100%"}
                            width={width}
                            fontSize={14}
                            style={{ lineHeight: 1.7, marginTop: '20px' }}
                            name="编辑器"
                            mode="markdown"
                            theme="github"
                            onChange={(input: string) => {
                                this.$change.next(input)
                            }}
                            onLoad={(props) => {
                                props.$blockScrolling = Infinity
                            }}
                        />
                    </div>
                    <div className="editor-footer">
                        <Button size="small" type="ghost">
                            <Icon type="file-markdown" />
                        </Button>
                        <Button size="small" type="ghost">
                            <Icon type="picture" />
                        </Button>
                        <div className="editor-footer-right">
                            <Button size="small" type="ghost">
                                <Icon type="swap" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="preview" style={{ width: `calc(100vw - ${width})` }}>
                    <div className="preview-content" >
                        <Preview></Preview>
                    </div>
                    <div className="preview-footer">
                        <div className="title">预览</div>
                        <div className="word-coun">字数</div>
                    </div>
                </div>
            </div>
        </Layout>

    }
}