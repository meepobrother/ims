import React, { Component } from 'react';
import "./index.less";
import Layout from '../layout'
import MediumEditor from '../MediumEditor'
import { observer, inject } from 'mobx-react';
import ImsCoreEditor from '../../store/index'
@inject('editor')
@observer
export default class Index extends Component<{ editor: ImsCoreEditor }, { focus: boolean }> {
    state = {
        focus: false
    }
    onChange = (text, medium) => {
        this.props.editor.setContent(text)
    }
    render() {
        console.log(this.props)
        return <Layout type="rich">
            <div className="ims-core-ditor-rich">
                <div className="ims-core-ditor-rich-content">
                    <MediumEditor text={this.props.editor.content} focus={this.state.focus} onChange={this.onChange} />
                </div>
            </div >
        </Layout>
    }
}
