const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

// User creates account
function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful'}))
    .catch(next);
}

// User logins
function login(req, res, next) {
  User
    .findOne({ email: req.body.email }) // system picks the email address
    .exec()
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) throw new Error('Unauthorized');
      //make a token
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      return res.json({ message: `Welcome back ${user.username}!`, token }); // flash message populate
    })
    .catch(next);
}

// --------- export functions ----------
module.exports = {
  register,
  login
};
