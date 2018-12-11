/* eslint-disable no-unused-expressions */

import chai from 'chai';

process.env.NODE_ENV = 'test';
const { assert } = chai;

/**
 * form Model Test
 * @module formModelTest Test
 */
describe('form Models', () => {
  /**
   * Docs
   * @param  {Function} done
   * @author @Radi
   */
  before((done) => {
    done();
  });

  it('should succeed because it is an example', (done) => {
    assert.equal(null, null);
    done();
  });
});
