import React, { Component, Suspense } from 'react';
export class ImsLazy extends Component<{ component: React.ReactNode, fallback?: any }, any> {
    static defaultProps = {
        fallback: () => <div></div>
    }
    render() {
        const { component: Component, fallback } = this.props;
        return <Suspense fallback={fallback()}>
            {Component}
        </Suspense>
    }
}