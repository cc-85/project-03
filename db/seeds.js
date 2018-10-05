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
    image: 'https://scontent-lhr3-1.cdninstagram.com/vp/b2bc9e58198529c2920da9da395c3740/5C406585/t51.2885-19/s150x150/26397835_2079741798904414_3038168670149804032_n.jpg',
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
