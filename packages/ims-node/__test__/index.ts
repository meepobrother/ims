import {
    cryptoPassword,
    random,
    isEqualPassword,
} from '../lib/index';
import { expect } from 'chai'
describe('ims-node', () => {
    it('random', () => {
        expect(random(4).length).to.equal(4)
    })
    it('cryptoPassword', () => {
        const token = random(4);
        expect(cryptoPassword(`ims`, token)).to.eq(cryptoPassword(`ims`, token))
    })
    it('isEqualPassword', () => {
        const token = random(4);
        const password = cryptoPassword(`ims`, token);
        expect(isEqualPassword(`ims`, token, password)).to.eq(true)
    })
    it('createNginxConfig', () => { })
});
