import React = require('react');
import "./index.less";
import { AdminerLayout } from '../../../store/adminerLayout';
import { ImsRole } from 'ims-adminer';
export default class Index extends React.Component<{
    adminerLayout?: AdminerLayout;
    role?: ImsRole;
}, any> {
    render(): JSX.Element;
}
