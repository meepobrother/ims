import React = require('react');
interface IndexProps {
    next?: any;
    prev?: any;
}
interface IndexState {
    username?: string;
    password?: string;
    repassword?: string;
    loading?: boolean;
    usernameStatus?: "success" | "warning" | "error" | "validating" | "";
    passwordStatus?: "success" | "warning" | "error" | "validating" | "";
    repasswordStatus?: "success" | "warning" | "error" | "validating" | "";
}
export default class Index extends React.Component<IndexProps, IndexState> {
    static defaultProps: {
        mobile: string;
        code: string;
    };
    state: IndexState;
    constructor(props: any);
    render(): JSX.Element;
    username(val: string): void;
    next(): void;
    password(val: string): void;
    rePassword(val: string): void;
}
export {};
