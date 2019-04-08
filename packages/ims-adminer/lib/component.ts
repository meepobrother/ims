import { Component as ReactComponent } from 'react';
import { makePath } from './path'
export interface ComponentProps {
    m: string;
}
export class Component<P extends ComponentProps, S> extends ReactComponent<P, S> {
    constructor(props: P) {
        super(props)
    }
    createUrl(c: string = '/', a: string = 'index') {
        return makePath({
            m: this.props.m, c, a
        });
    }
}
