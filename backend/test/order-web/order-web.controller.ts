import 'mocha';
import { expect } from 'chai';
import request, { Test } from 'supertest';
import Server from '../../server';


describe('Order', () => {
  describe('Invalid payload schema', () => {    
    [
      [{}],
      ['string'],
      [1],
      [true],
      [{ id: 12, count: 4 }]
    ].map(payload =>
      it('should fail with 400', () =>  
        makeOrder(payload)
          .then(res => expect(res.status).to.be.equal(400))
        ));
  });

  describe('Invalid payload data', () => {
    [
      [{ id: '12', numberOfItems: 3 }],
      [{ id: 12, numberOfItems: '3' }],
      [{ id: 12, numberOfItems: true }],
      [{ id: true, numberOfItems: 3 }]
    ].map(payload =>
      it('should fail with 400', () =>
        makeOrder(payload)
          .then(res => expect(res.status).to.be.equal(400))
      ));
  });

  describe('Valid order', () => {
    describe('with no discount', () => {
      [
        {
          expectedPrice: 17,
          orderItems: [{ id: 12, numberOfItems: 1 }, { id: 21, numberOfItems: 1 }, { id: 37, numberOfItems: 1 }],
        },
        {
          expectedPrice: 17.5,
          orderItems: [{ id: 12, numberOfItems: 1 }, { id: 37, numberOfItems: 2 }],
        },
        {
          expectedPrice: 16.5,
          orderItems: [{ id: 12, numberOfItems: 1 }, { id: 21, numberOfItems: 2 }],
        },
        {
          expectedPrice: 18,
          orderItems: [{ id: 21, numberOfItems: 1 }, { id: 21, numberOfItems: 2 }],
        },
        {
          expectedPrice: 18,
          orderItems: [{ id: 21, numberOfItems: 3 }],
        },
        {
          expectedPrice: 19.5,
          orderItems: [{ id: 37, numberOfItems: 3 }],
        }
      ].map(({ expectedPrice, orderItems }) =>
        it('should create an order', () =>
          makeOrder(orderItems)
            .then(res => {
              expect(res.status).to.equal(201);
              expect(res.body.price.amount).equal(expectedPrice);
            })
        ));
    });

    describe('with no discount', () => {
      [
        {
          expectedPrice: 4.5,
          orderItems: [{ id: 12, numberOfItems: 1 }],
        },
        {
          expectedPrice: 4.5,
          orderItems: [{ id: 12, numberOfItems: 2 }],
        },
        {
          expectedPrice: 9,
          orderItems: [{ id: 12, numberOfItems: 3 }],
        },
        {
          expectedPrice: 13.5,
          orderItems: [{ id: 12, numberOfItems: 5 }],
        },
        {
          expectedPrice: 17,
          orderItems: [{ id: 12, numberOfItems: 2 }, { id: 21, numberOfItems: 1 }, { id: 37, numberOfItems: 1 }],
        },
        {
          expectedPrice: 17.5,
          orderItems: [{ id: 12, numberOfItems: 2 }, { id: 37, numberOfItems: 2 }],
        },
        {
          expectedPrice: 16.5,
          orderItems: [{ id: 12, numberOfItems: 2 }, { id: 21, numberOfItems: 2 }],
        },
        {
          expectedPrice: 38,
          orderItems: [{ id: 12, numberOfItems: 8 }, { id: 21, numberOfItems: 2 }, { id: 37, numberOfItems: 2 }],
        }
      ].map(({ expectedPrice, orderItems }) =>
        it('should create an order', () =>
          makeOrder(orderItems)
            .then(res => {
              expect(res.status).to.equal(201);
              expect(res.body.price.amount).equal(expectedPrice);
            })
        ));
    });

    it('should create an order and ignore unexpected product', () => {
      const expectedPrice = 38;
      const unexpectedProduct = { id: 30, numberOfItems: 2 };
      const expectedProducts = [
        { id: 12, numberOfItems: 8 }, { id: 21, numberOfItems: 2 }, { id: 37, numberOfItems: 2 }
      ]

      return makeOrder([ ...expectedProducts, unexpectedProduct ])
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res.body.price.amount).equal(expectedPrice);
        })
    });
  })


});

// Private functions
function makeOrder(payload: any[]): Test {
  return request(Server)
    .post('/api/v1/order')
    .send(payload);
}