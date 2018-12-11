/* eslint-disable no-unused-expressions */

import chai from 'chai';

process.env.NODE_ENV = 'test';
const { assert } = chai;

/**
 * form Helper Tests
 * @module formHelperTest Test
 */
describe('form Helpers', () => {
  /**
   * Tests Empty
   * @param {Function} done
   * @author @Radi
   */
  it('should succeed because it is an example', (done) => {
    assert.equal(null, null);
    done();
  });
});
