"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key_1 = require("./key");
const codes = __importStar(require("./codes"));
function sign(payload) {
    const key = key_1.getKey();
    return jsonwebtoken_1.default.sign(payload, key.privKey, {
        expiresIn: '30m'
    });
}
exports.sign = sign;
function verify(fn) {
    return (req, res, next) => {
        const token = req.headers.authorization;
        const key = key_1.getKey();
        jsonwebtoken_1.default.verify(token, key.privKey, (err, decoded) => {
            if (err) {
                res.json({
                    data: {},
                    code: codes.TokenDecodeError,
                    message: err.message
                });
            }
            else {
                if (fn(decoded)) {
                    next();
                }
                else {
                    res.json({
                        data: {},
                        code: codes.PermissionDenied,
                        message: '对不起,权限不足'
                    });
                }
            }
        });
    };
}
exports.verify = verify;
