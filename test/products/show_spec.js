/* global api, describe, it, expect, beforeEach */

const Product = require('../../models/product');
const User = require('../../models/user');

const productData = [{
  name: 'jumper',
  size: '10',
  colour: 'purple',
  image: 'http://test.com/test.jpg',
  price: 10,
  description: 'beautiful jumper hhh zzzjefwehu h Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}, {
  name: 'trousers',
  size: '8',
  colour: 'blue',
  image: 'http://test1.com/test.jpg',
  price: 12,
  description: 'beautiful jeans Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}];

let product;

describe('GET /products/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Product.remove({})
    ])
      .then(() => Product.create(productData))
      .then(products => product = products[0])
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get(`/api/products/${product._id}`)
      .expect(200, done);
  });

  it('should return a product', done => {
    api
      .get(`/api/products/${product._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'name',
          'size',
          'colour',
          'image',
          'price',
          'description'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get(`/api/products/${product._id}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(productData[0].name);
        expect(res.body.size).to.eq(productData[0].size);
        expect(res.body.colour).to.eq(productData[0].colour);
        expect(res.body.image).to.eq(productData[0].image);
        expect(res.body.price).to.eq(productData[0].price);
        expect(res.body.description).to.eq(productData[0].description);
        done();
      });
  });
});
