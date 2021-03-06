const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User model
const userSchema = new mongoose.Schema({
  username: { type: String,
    required: [ true, 'Username is required'],
    unique: true
  },
  email: {
    type: String,
    required: [ true, 'Email is required'],
    unique: true
  },
  image: {
    type: String,
    required: [ true, 'Image is required'],
    match: [ /^https?:\/\/.+/, 'Images must start with \'http\'' ]
  },
  password: {
    type: String,
    required: [ true, 'Password is required']
  }
});

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password;
    return json;
  }
});

userSchema.plugin(require('mongoose-unique-validator'), {
  message: 'that {PATH} is already in use'
});

// this virtual will aggregate all the products of this user
userSchema.virtual('products', {
  localField: '_id',
  foreignField: 'user',
  ref: 'Product'
});

// this virtual will aggregate all the messages of this user
userSchema.virtual('messages', {
  localField: '_id', //match id of this user to id of receiver (foreignField) to collect messages
  foreignField: 'receiver',
  ref: 'Message'
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// Checking password and password confirmation match
userSchema.pre('validate', function checkPasswordsMatch(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

//password is hashed
userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// the system compares passwords and authorize login
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
