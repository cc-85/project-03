const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);

const { dbURI } = require('../config/environment');

const Product = require('../models/product');
const User = require('../models/user');

mongoose.connectAsync(dbURI)
  .then(db => db.dropDatabase())
  .then(() => User.create({
    username: 'cc-85',
    email: 'caoimhepower@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  }))
  .then(user => Product.create([{
    name: 'Gold Mini Skirt',
    size: '6',
    colour: 'Gold',
    image: 'https://img.shein.com/images/shein.com/201610/fa/14757265932724802132_im_900x1199.jpg',
    price: '10',
    description: 'Gorgeous gold sequin skirt',
    user: user
  }]))
  .then(products => console.log(`${products.length} products created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
