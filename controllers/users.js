const User = require('../models/user');

// User profile page
function userShowRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('user products')
    .populate({                    //messages appear on user's profile
      path: 'messages',
      populate: {
        path: 'sender',
        select: 'username image'
      }
    })
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

// ---------- export functions ----------
module.exports = {
  show: userShowRoute,
  update: updateRoute
};
