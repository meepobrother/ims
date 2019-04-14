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
function hasDocumentCookie() {
    // Can we get/set cookies on document.cookie?
    return typeof document === 'object' && typeof document.cookie === 'string';
}
exports.hasDocumentCookie = hasDocumentCookie;
function cleanCookies() {
    document.cookie.split(';').forEach(function (c) {
        document.cookie = c
            .replace(/^ +/, '')
            .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
}
exports.cleanCookies = cleanCookies;
function parseCookies(cookies) {
    if (typeof cookies === 'string') {
        return cookie.parse(cookies);
    }
    else if (typeof cookies === 'object' && cookies !== null) {
        return cookies;
    }
    else {
        return {};
    }
}
exports.parseCookies = parseCookies;
function isParsingCookie(value, doNotParse) {
    if (typeof doNotParse === 'undefined') {
        // We guess if the cookie start with { or [, it has been serialized
        doNotParse =
            !value || (value[0] !== '{' && value[0] !== '[' && value[0] !== '"');
    }
    return !doNotParse;
}
exports.isParsingCookie = isParsingCookie;
function readCookie(value, options = {}) {
    const cleanValue = cleanupCookieValue(value);
    if (isParsingCookie(cleanValue, options.doNotParse)) {
        try {
            return JSON.parse(cleanValue);
        }
        catch (e) {
            // At least we tried
        }
    }
    // Ignore clean value if we failed the deserialization
    // It is not relevant anymore to trim those values
    return value;
}
exports.readCookie = readCookie;
function cleanupCookieValue(value) {
    // express prepend j: before serializing a cookie
    if (value && value[0] === 'j' && value[1] === ':') {
        return value.substr(2);
    }
    return value;
}
