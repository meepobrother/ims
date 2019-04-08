import { Component as ReactComponent } from 'react';
export interface ComponentProps {
    m: string;
}
export declare class Component<P extends ComponentProps, S> extends ReactComponent<P, S> {
    constructor(props: P);
    createUrl(c?: string, a?: string): string;
}
