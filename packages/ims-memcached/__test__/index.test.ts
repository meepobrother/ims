import { expect } from 'chai';
import { bootstrap } from '../lib/index';
import Memcached from 'memcached'
describe('ims-memcached', () => {
    it('bootstrap() should instance of ', () => {
        const result = bootstrap();
        expect(result instanceof Memcached).to.equal(true);
    });
});