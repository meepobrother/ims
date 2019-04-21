"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const rimraf = require("rimraf");
const shelljs_1 = require("shelljs");
var net_1 = require("net");
exports.isIP = net_1.isIP;
exports.isIPv4 = net_1.isIPv4;
exports.isIPv6 = net_1.isIPv6;
__export(require("./jwt"));
__export(require("./key"));
/** 生成随机数 */
exports.random = (length) => {
    return crypto_1.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};
/**
 * 加密密码
 * 一般用于加密用户密码
 * @param password 要加密的密码
 */
function cryptoPassword(password, token) {
    const md5 = crypto_1.createHash('md5');
    const base64Random = Buffer.from(token).toString('base64');
    const newPas = base64Random + password;
    const md5Pas = md5.update(newPas).digest("hex");
    const base64Md5 = Buffer.from(md5Pas).toString('base64');
    return base64Random + base64Md5;
}
exports.cryptoPassword = cryptoPassword;
/**
 * 判断密码是否正确
 * 一般用于登录时验证密码正确与否
 * @param srcPassword 明文密码
 * @param token 加密token
 * @param password 密码
 */
function isEqualPassword(srcPassword, token, password) {
    return cryptoPassword(srcPassword, token) === password;
}
exports.isEqualPassword = isEqualPassword;
/**
 * 删除文件夹或文件
 * @param dir 文件或文件夹地址
 */
function rmrf(dir) {
    return new Promise((resolve) => {
        rimraf(dir, () => resolve());
    });
}
exports.rmrf = rmrf;
const gulp_1 = __importDefault(require("gulp"));
function copyDir(from, to) {
    return new Promise((resolve) => {
        const task = gulp_1.default.src(from).pipe(gulp_1.default.dest(to));
        task.on('end', () => {
            resolve();
        });
    });
}
exports.copyDir = copyDir;
/**
 * 执行命令
 * @param command 命令内容
 */
function execSync(command) {
    return new Promise((resolve, reject) => {
        shelljs_1.exec(command, { cwd: process.cwd() }, (code, out, err) => {
            resolve(out);
        });
    });
}
exports.execSync = execSync;
