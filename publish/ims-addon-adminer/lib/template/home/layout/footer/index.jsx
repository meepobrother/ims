"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const GlobalFooter_1 = __importDefault(require("ant-design-pro/lib/GlobalFooter"));
let Index = class Index extends React.Component {
    render() {
        const { homeLayout } = this.props;
        return <GlobalFooter_1.default links={homeLayout.footer.links} copyright={homeLayout.footer.copyright}></GlobalFooter_1.default>;
    }
};
Index = __decorate([
    mobx_react_1.inject('homeLayout'),
    mobx_react_1.observer
], Index);
exports.default = Index;
