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
const loading_1 = require("./loading");
const mobx_react_1 = require("mobx-react");
const Authorized_1 = __importDefault(require("ant-design-pro/lib/Authorized"));
const react_1 = __importDefault(require("react"));
let ImsRoutes = class ImsRoutes extends react_1.default.Component {
    render() {
        const { route } = this.props;
        const userRole = this.props.login.role || 'default';
        const AuthorizedRoute = Authorized_1.default(userRole).AuthorizedRoute;
        const props = (router) => ({
            authority: role => {
                if (!router.roles)
                    return true;
                if (router.roles.length === 0)
                    return true;
                if (role === 'admin')
                    return true;
                return router.roles.indexOf(role) > -1;
            },
            redirectPath: '/403',
            key: router.path,
            path: router.path,
            exact: !!router.exact,
            render: () => {
                return <react_1.default.Suspense fallback={<loading_1.Loading />}>
                    <router.component route={router}/>
                </react_1.default.Suspense>;
            }
        });
        return route.routes && route.routes.map((router, key) => {
            const _props = props(router);
            console.log({ _props, router });
            return <AuthorizedRoute {..._props}/>;
        });
    }
};
ImsRoutes.defaultProps = {
    fallback: () => <div></div>
};
ImsRoutes = __decorate([
    mobx_react_1.inject('login'),
    mobx_react_1.observer
], ImsRoutes);
exports.ImsRoutes = ImsRoutes;
