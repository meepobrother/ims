"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const chai_1 = require("chai");
describe('ims-common', () => {
    it('getConfig', () => {
        chai_1.expect(index_1.getConfig()).to.equal(undefined);
    });
    it('setConfig', () => {
        chai_1.expect(index_1.setConfig({})).to.equal(void 0);
        chai_1.expect(index_1.getConfig()).to.deep.eq({});
    });
});
