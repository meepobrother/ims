"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const path_1 = require("./path");
class Component extends react_1.Component {
    constructor(props) {
        super(props);
    }
    createUrl(c = '/', a = 'index') {
        return path_1.makePath({
            m: this.props.m, c, a
        });
    }
}
exports.Component = Component;
