"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const history_1 = require("history");
const query_string_1 = tslib_1.__importDefault(require("query-string"));
exports.history = history_1.createBrowserHistory();
let currentLocation = exports.history.location;
const scrollPositionsHistory = {};
const context = {};
exports.onLocationChange = (location, action) => {
    scrollPositionsHistory[currentLocation.key] = {
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset,
    };
    currentLocation = location;
    try {
        context.pathname = location.pathname;
        context.query = query_string_1.default.parse(location.search);
    }
    catch (e) { }
    console.log({ action });
};
exports.history.listen(exports.onLocationChange);
