"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const chai_1 = require("chai");
describe('ims-node', () => {
    it('random', () => {
        chai_1.expect(index_1.random(4).length).to.equal(4);
    });
    it('cryptoPassword', () => {
        const token = index_1.random(4);
        chai_1.expect(index_1.cryptoPassword(`ims`, token)).to.eq(index_1.cryptoPassword(`ims`, token));
    });
    it('isEqualPassword', () => {
        const token = index_1.random(4);
        const password = index_1.cryptoPassword(`ims`, token);
        chai_1.expect(index_1.isEqualPassword(`ims`, token, password)).to.eq(true);
    });
});
