import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../server';

describe('Product', () => {
  it('should get all products', () =>
    request(Server)
      .get('/api/v1/products')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .of.length(3);
      }));
});
