import React = require('react');
import { ValidateStatus } from 'ims-adminer';
interface IndexProps {
    next?: any;
    prev?: any;
}
interface FormItem {
    hasFeedback: boolean;
    required: boolean;
    validateStatus: ValidateStatus;
    label: string;
    value: any;
    placeholder: string;
}
interface IndexState {
    host?: FormItem;
    port?: FormItem;
    username?: FormItem;
    password?: FormItem;
}
export default class Index extends React.Component<IndexProps, IndexState> {
    static defaultProps: IndexProps;
    state: IndexState;
    constructor(props: IndexProps);
    render(): JSX.Element;
    setUsername(val: string): void;
    setPassword(val: string): void;
    setHost(val: string): void;
    setPort(val: string): void;
    next(): void;
}
export {};
