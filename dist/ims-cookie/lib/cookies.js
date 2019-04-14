"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie = __importStar(require("cookie"));
const util_1 = require("./util");
// We can't please Rollup and TypeScript at the same time
// Only way to make both of them work
const objectAssign = require('object-assign');
class ImsCookie {
    constructor(cookies) {
        this.changeListeners = [];
        this.TESTING_ONETWO = 2;
        this.cookies = util_1.parseCookies(cookies);
        this.HAS_DOCUMENT_COOKIE = util_1.hasDocumentCookie();
    }
    _updateBrowserValues() {
        if (!this.HAS_DOCUMENT_COOKIE) {
            return;
        }
        this.cookies = cookie.parse(document.cookie);
    }
    _emitChange(params) {
        for (let i = 0; i < this.changeListeners.length; ++i) {
            this.changeListeners[i](params);
        }
    }
    get(name, options = {}) {
        this._updateBrowserValues();
        return util_1.readCookie(this.cookies[name], options);
    }
    getAll(options = {}) {
        this._updateBrowserValues();
        const result = {};
        for (let name in this.cookies) {
            result[name] = util_1.readCookie(this.cookies[name], options);
        }
        return result;
    }
    set(name, value, options) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        this.cookies = objectAssign({}, this.cookies, { [name]: value });
        if (this.HAS_DOCUMENT_COOKIE) {
            document.cookie = cookie.serialize(name, value, options);
        }
        this._emitChange({ name, value, options });
    }
    remove(name, options) {
        const finalOptions = (options = objectAssign({}, options, {
            expires: new Date(1970, 1, 1, 0, 0, 1),
            maxAge: 0
        }));
        this.cookies = objectAssign({}, this.cookies);
        delete this.cookies[name];
        if (this.HAS_DOCUMENT_COOKIE) {
            document.cookie = cookie.serialize(name, '', finalOptions);
        }
        this._emitChange({ name, value: undefined, options });
    }
    addChangeListener(callback) {
        this.changeListeners.push(callback);
    }
    removeChangeListener(callback) {
        const idx = this.changeListeners.indexOf(callback);
        if (idx >= 0) {
            this.changeListeners.splice(idx, 1);
        }
    }
}
exports.ImsCookie = ImsCookie;
