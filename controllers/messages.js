const Message = require('../models/message');

function createRoute(req, res, next) {
  req.body.sender = req.currentUser;
  Message
    .create(req.body)
    .then(message => res.status(201).json(message))
    .catch(next);
}

module.exports = {
  create: createRoute
};
