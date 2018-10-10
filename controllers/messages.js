const Message = require('../models/message');

// function to create, send message to current user
function createRoute(req, res, next) {
  req.body.sender = req.currentUser; //setting sender of the message as the current user
  Message
    .create(req.body) //post the message
    .then(message => res.status(201).json(message))
    .catch(next);
}


// function to delete the received message
function deleteMessageRoute(req, res, next) {
  req.body.sender = req.currentUser;
  Message
    .findById(req.params.id)
    .exec()
    .then(message => message.remove()) 
    .then(() => res.sendStatus(204))
    .catch(next);
}


// ---------- export functions ----------
module.exports = {
  create: createRoute,
  deleteMessage: deleteMessageRoute
};
