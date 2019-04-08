"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
class Link extends react_1.Component {
    render() {
        return <react_router_dom_1.Link {...this.props}></react_router_dom_1.Link>;
    }
}
exports.Link = Link;
