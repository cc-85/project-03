const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);

const { dbURI } = require('../config/environment');

const Product = require('../models/product');
const User = require('../models/user');
let seededUsers = [];

mongoose.connectAsync(dbURI)
  .then(db => db.dropDatabase())
  .then(() => User.create({                  // create user
    username: 'cc-85',
    email: 'caoimhepower@gmail.com',
    image: 'https://scontent-lhr3-1.cdninstagram.com/vp/b2bc9e58198529c2920da9da395c3740/5C406585/t51.2885-19/s150x150/26397835_2079741798904414_3038168670149804032_n.jpg',
    password: 'pass',
    passwordConfirmation: 'pass'
  },{
    username: 'cah1983',
    email: 'carolineho1983@yahoo.fr',
    image: 'https://ca.slack-edge.com/T0351JZQ0-UBXDAKMEF-126aeff81892-72         ',
    password: 'pass',
    passwordConfirmation: 'pass'
  }))
  .then((users) => seededUsers = users)
  .then(() => Product.create([{                   //create product
    name: 'Gold Mini Skirt',
    size: '6',
    colour: 'Gold',
    image: 'https://img.shein.com/images/shein.com/201610/fa/14757265932724802132_im_900x1199.jpg',
    price: '10',
    description: 'Gorgeous gold sequin skirt',
    user: seededUsers[1]                       // assign a product to his owner/user
  }, {
    name: 'Mint Green Jumper',
    size: '10',
    colour: 'Green',
    image: 'https://i.pinimg.com/originals/5f/0e/7b/5f0e7b2890d8187693f31ea9faf004aa.jpg',
    price: '15',
    description: 'Cosy oversized mint green jumper',
    user: seededUsers[0]
  }, {
    name: 'Floral maxi skirt',
    size: '10',
    colour: 'Black/White',
    image: 'https://images.asos-media.com/products/asos-design-ditsy-floral-button-through-maxi-skirt/9893387-1-blackyellow?$XXL$&wid=513&fit=constrain',
    price: '15',
    description: 'Black floral button through maxi skirt with ditsy floral print.',
    user: seededUsers[0]
  }, {
    name: 'Polka dot dungarees',
    size: '12',
    colour: 'Black and white',
    image: 'https://images.asos-media.com/products/asos-spot-print-dungarees-in-twill/2868274-1-blackwhite?$XXL$&wid=513&fit=constrain',
    price: '22',
    description: 'Black and white polka dot dungarees',
    user: seededUsers[0]
  }, {
    name: 'Mustard oversized jumper',
    size: '10',
    colour: 'Mustard yellow',
    image: 'https://media2.newlookassets.com/i/newlook/576580987D3/womens/clothing/knitwear/mustard-cuffed-slouchy-oversized-jumper.jpg?strip=true&qlt=80&w=1200',
    price: '22',
    description: 'Stay warm in style in this soft slouchy jumper. Pair with black skinny jeans and trainers for a fuss-free casual look.',
    user: seededUsers[0]
  }, {
    name: 'Ted Baker trainers',
    size: '4',
    colour: 'White/Pink',
    image: 'https://resources.mandmdirect.com/Images/_default/t/b/3/tb3678_1_cloudzoom.jpg',
    price: '30',
    description: 'Ted Baker low profile lace-up trainers with a floral design.',
    user: seededUsers[1]
  }, {
    name: 'Misguided Sassy t-shirt',
    size: '8',
    colour: 'White',
    image: 'https://media.missguided.com/s/missguided/TJ41429_set/1/white-sassy-slogan-t-shirt.jpg?$product-page__main--1x$',
    price: '20',
    description: 'An oversized t-shirt with white hue and red sassy front graphic print',
    user: seededUsers[1]
  }, {
    name: 'Leopard print mini skirt',
    size: '6',
    colour: 'Brown',
    image: 'https://media3.newlookassets.com/i/newlook/600683729D3/womens/clothing/skirts/petite-tan-leopard-print-denim-mini-skirt.jpg?strip=true&qlt=80&w=1200',
    price: '10',
    description: 'Embrace the wilder side of dressing in this animal print skirt. Wear it belted with a leather-look jacket and biker boots for an edgy look.',
    user: seededUsers[0]
  }, {
    name: 'Striped top',
    size: '12',
    colour: 'White',
    image: 'http://www.katescloset.com.au/uploads/2/1/2/9/21295692/ralph-lauren-tori-breton-stripe-1_1_orig.jpeg',
    price: '10',
    description: 'White top with narrow blue stripes.',
    user: seededUsers[0]
  }, {
    name: 'Misguided sunglasses',
    size: 'One size',
    colour: 'Black',
    image: 'https://media.missguided.com/s/missguided/A2501440_set/3/black-round-club-sunglasses.jpg?$product-page__zoom--1x$',
    price: '20',
    description: 'When the sun comes out to play, so can you, wearing these rounded club sunglasses in a black hue. these sunglasses are the sort that look good on everyone!',
    user: seededUsers[1]
  }, {
    name: 'Yellow wool beret',
    size: 'One size',
    colour: 'Yellow',
    image: 'https://images.asos-media.com/products/my-accessories-yellow-wool-beret/9196600-4?$XXL$&wid=513&fit=constrain',
    price: '5',
    description: 'This beret is crafted from pure wool for a soft and snug feel. This block-colour design will have you rocking the trend with that je ne sais quoi, and is guaranteed to be your go-to hat this season.',
    user: seededUsers[1]
  }]))
  .then(products => console.log(`${products.length} products created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
