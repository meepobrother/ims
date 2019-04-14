import React = require('react');
export default class Index extends React.Component<any, any> {
    state: {
        installing: boolean;
        loading: boolean;
        button: string;
        total: number;
        link: string;
    };
    componentDidMount(): void;
    render(): JSX.Element;
    renderButton(): JSX.Element;
    install(): void;
}
