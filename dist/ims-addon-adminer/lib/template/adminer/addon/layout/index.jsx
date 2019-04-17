"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ims_adminer_1 = require("ims-adminer");
class Index extends React.Component {
    render() {
        return <ims_adminer_1.ImsRoutes route={this.props.route}/>;
    }
}
exports.default = Index;
