import React, { Component } from 'react';
import { Link as ReactLink, LinkProps } from 'react-router-dom';
export class Link extends Component<LinkProps, any> {
    render() {
        return <ReactLink {...this.props}></ReactLink>
    }
}