const User = require('../models/user');

// function userIndexRoute(req, res, next) {
//   User
//     .find()
//     .sort({ name: 1 })
//     .exec()
//     .then(users => res.json(users))
//     .catch(next);
// }

function userShowRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('user')
    .exec()
    .then(user => {
      if(!user) throw new Error('Not Found'); // create a custom error
      return res.json(user);
    })
    .catch(next);
}

module.exports = {
  // index: userIndexRoute,
  show: userShowRoute
};
