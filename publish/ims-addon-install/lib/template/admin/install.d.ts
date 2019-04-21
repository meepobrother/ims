import React = require('react');
interface IndexState {
    step: number;
    db: {
        host: string;
        port: string;
        username: string;
        password: string;
    };
    user: {
        username: string;
        password: string;
    };
}
export default class Index extends React.Component<any, IndexState> {
    state: IndexState;
    componentDidMount(): void;
    install(): void;
    changeDb(key: string, value: string): void;
    nextStep(): void;
    prevStep(): void;
    render(): JSX.Element;
}
export {};
