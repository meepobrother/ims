"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../lib/index");
const memcached_1 = __importDefault(require("memcached"));
describe('ims-memcached', () => {
    it('bootstrap() should instance of ', () => {
        const result = index_1.bootstrap();
        chai_1.expect(result instanceof memcached_1.default).to.equal(true);
    });
});
