const User = require('../models/user');

function userShowRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('user products messages')
    .exec()
    .then(user => {
      if(!user) throw new Error('Not Found'); // create a custom error
      return res.json(user);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  show: userShowRoute,
  update: updateRoute
};
