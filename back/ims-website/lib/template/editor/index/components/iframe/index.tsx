import React, { Component } from 'react';
interface IndexProps {
    className?: string;
    mediaStateSelect?: string;
    style?: React.CSSProperties;
}
export default class Index extends Component<IndexProps> {
    iframe: HTMLIFrameElement;
    getData() { }
    render() {
       return <div>
           <iframe className={'edit-preview'} src={'/adminer/ucenter'}></iframe>
       </div>
    }
}
