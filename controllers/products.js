const Product = require('../models/product');

// Shows all the products
function indexRoute(req, res, next) {
  Product
    .find()
    .sort({ name: 1 })
    .exec()
    .then(products => res.json(products))
    .catch(next);
}

// shows 1 product
function showRoute(req, res, next) {
  Product
    .findById(req.params.id) // find product
    .populate('user') // displays name of the user owner
    .exec()
    .then(product => {
      if(!product) throw new Error('Not Found'); // create a custom error
      return res.json(product);
    })
    .catch(next);
}

// create a new product
function createRoute(req, res, next) {
  req.body.user = req.currentUser;
  Product
    .create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next);
}

// Edit product page
function updateRoute(req, res, next) {
  Product
    .findById(req.params.id)
    .exec()
    .then(product => product.set(req.body))
    .then(product => product.save())
    .then(product => res.json(product))
    .catch(next);
}

// Delete the product
function deleteRoute(req, res, next) {
  Product
    .findById(req.params.id)
    .exec()
    .then(product => product.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

// ---------- export functions ----------
module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
