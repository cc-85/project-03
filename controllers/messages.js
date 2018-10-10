const Message = require('../models/message');

function createRoute(req, res, next) {
  req.body.sender = req.currentUser;
  Message
    .create(req.body)
    .then(message => res.status(201).json(message))
    .catch(next);
}

function deleteMessageRoute(req, res, next) {
  req.body.sender = req.currentUser;
  Message
    .findById(req.params.id)
    .exec()
    .then(message => message.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}


module.exports = {
  create: createRoute,
  deleteMessage: deleteMessageRoute
};
