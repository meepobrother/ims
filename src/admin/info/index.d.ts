import React = require('react');
export default class Index extends React.Component<any, any> {
    state: {
        agree: boolean;
        info: string;
    };
    render(): JSX.Element;
    next(): void;
}
