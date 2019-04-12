import {
    getConfig,
    setConfig
} from '../lib/index';
import { expect } from 'chai'
describe('ims-common', () => {
    it('getConfig', () => {
        expect(getConfig()).to.equal(undefined)
    })
    it('setConfig', () => {
        expect(setConfig({})).to.equal(void 0)
        expect(getConfig()).to.deep.eq({})
    })
});