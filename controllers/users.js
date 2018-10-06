const User = require('../models/user');

function userShowRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('user products')
    .exec()
    .then(user => {
      if(!user) throw new Error('Not Found'); // create a custom error
      return res.json(user);
    })
    .catch(next);
}

module.exports = {
  show: userShowRoute
};
