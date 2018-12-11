/* eslint-disable no-unused-expressions */

import chai from 'chai';
import chaiHttp from 'chai-http';

// import app from '../app';

process.env.NODE_ENV = 'test';
const { expect } = chai;
chai.use(chaiHttp);

/**
 * auth Routes Test
 * @module authRoutesTest Test
 */
describe('auth Routes', () => {
  /**
   * Docs
   * @param  {Function} done
   * @author @Radi
   */
  before((done) => {
    done();
  });

  /**
   * After all tests are restore stubbed methods
   * @param  {Function} done
   * @author @Radi
   */
  after((done) => {
    done();
  });

  /**
   *
   * @param  {Function} done
   * @author @Radi
   */
  describe('auth URL', () => {
    it('should succeed because it is an example', (done) => {
      expect(null).to.be.null;
      done();
    });
  });
});
