const Product = require('../models/product');

function indexRoute(req, res, next) {
  Product
    .find()
    .sort({ name: 1 })
    .exec()
    .then(products => res.json(products))
    .catch(next);
}

function showRoute(req, res, next) {
  Product
    .findById(req.params.id)
    .exec()
    .then(product => {
      if(!product) throw new Error('Not Found'); // create a custom error
      return res.json(product);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser;
  Product
    .create(req.body)
    .then(product => res.staus(401).json(product))
    .catch(next);
}

function updateRoute(req, res, next) {
  Product
    .findById(req.params.id)
    .exec()
    .then(product => product.set(req.body))
    .then(product => product.save())
    .then(product => res.json(product))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Product
    .findById(req.params.id)
    .exec()
    .then(product => product.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}


module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
