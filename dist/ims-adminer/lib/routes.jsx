"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
class ImsRoutes extends react_1.Component {
    render() {
        const { route, fallback } = this.props;
        return <react_1.Suspense fallback={fallback()}>
            {route.routes && route.routes.map((router, key) => {
            const { component: Component, ...props } = router;
            return <react_router_dom_1.Route key={key} {...props} render={() => <Component route={router}/>}/>;
        })}
        </react_1.Suspense>;
    }
}
ImsRoutes.defaultProps = {
    fallback: () => <div></div>
};
exports.ImsRoutes = ImsRoutes;
